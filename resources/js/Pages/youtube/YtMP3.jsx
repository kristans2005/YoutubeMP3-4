import { useRef, useState } from 'react';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import { youtube_parser } from './Utils';

export default function YtMP3({ auth }) {
    const inputUrlRef = useRef();
    const [urlResult, setUrlResult] = useState(null);
    const [audioTitle, setAudioTitle] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const youtubeID = youtube_parser(inputUrlRef.current.value);

        try {
            const response = await axios.get('https://youtube-mp36.p.rapidapi.com/dl', {
                headers: {
                    'X-RapidAPI-Key': '30adb9c080msh002b87e1a39b208p13c8dajsne572b73c2831',
                    'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
                },
                params: {
                    id: youtubeID
                }
            });
            console.log(response.data);
            setUrlResult(response.data.link);
            
            setAudioTitle(response.data.title);
        } catch (err) {
            setError('Failed to download MP3. Please try again later.');
            console.error(err);
        }

        setLoading(false);
        inputUrlRef.current.value = '';  
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Your Title Here</h2>}
        >
            <Head title="onichina" />

            <div className='m-4 w-screen h-full grid justify-center content-center text-white'>
                <div className='bg-slate-800 p-5 rounded-md shadow-2xl shadow-slate-800'>
                    <div className='border-b-2 pb-2 border-gray-600' >
                        <h1 className='text-bold text-center text-3xl'>YouTube MP3 download</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='m-4 flex content-center justify-center flex-col gap-4'>
                            <div>
                                {urlResult ? (
                                    <div className='text-center grid gap-3'>
                                        <div>
                                            <h1 className='text-bold font-bold text-4xl text-slate-200 ' >{audioTitle}</h1>
                                        </div>
                                        <div>
                                            <a href={urlResult} className=' text-red-300 underline'>
                                                Click hear to download audio
                                            </a>
                                        </div>
                                        <div className='flex justify-end content-end mt-6'>
                                            <PrimaryButton
                                            className=' bg-slate-700 hover:bg-slate-600 dark:text-white' 
                                            children="convert next audio"
                                            />
                                        </div>
                                    </div>
                                    
                                ) : (
                                    <div>
                                    <TextInput ref={inputUrlRef} placeholder="Add YouTube link here" className='dark:border-gray-400 w-full' />
                                    
                                    <PrimaryButton
                                        type="submit"
                                        className=' mt-4 justify-center bg-blue-500 dark:focus:bg-blue-500 dark:active:bg-blue-400 dark:bg-blue-500 w-full h-10 dark:text-white dark:hover:bg-blue-400'
                                        disabled={loading}
                                    >
                                        {loading ? 'Loading...' : 'Convert'}
                                    </PrimaryButton>
                                    </div>
                                )}
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
