import { useRef, useState } from 'react';
import { Link, router } from '@inertiajs/react';
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
        setApiErrors(null);
        setError(null);
        setLoading(true);
    
        const inputUrl = inputUrlRef.current.value.trim();
        const youtubeID = youtube_parser(inputUrl);

        if (!inputUrl) {
            setError('Please fill the form.');
            setLoading(false);
            return;
        }
        
        if (youtubeID == false ) {
            setError('Please enter a valid YouTube URL.');
            setLoading(false);
            return;
        }

    
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
            setApiErrors(response.data.error);
            setAudioTitle(response.data.title);
            
        if(response.data.msg != "Invalid request" ){
            console.log("its a valid link :)");
            const data = {url: inputUrl, title: response.data.title, urlFormat: "mp3"}
            console.log(data);
            router.post('/mp3/save', data);

        }

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

            <div className=' w-full h-full grid justify-center content-center text-white'>
                <div className='bg-slate-800 m-4 mt-[20px] sm:mt-[100px]  p-5 rounded-md shadow-2xl shadow-slate-800'>
                    <div className='border-b-2 pb-2 border-gray-600' >
                        <h1 className='text-bold text-center text-3xl'>YouTube MP3 download</h1>
                    </div>
                    <form method='POST' onSubmit={handleSubmit}>
                        <div className='m-4 flex content-center justify-center flex-col gap-4'>
                            <div>
                                {urlResult ? (
                                    <div className='text-center grid gap-3'>
                                        <div>
                                            <h1 className='text-bold font-bold text-4xl text-slate-200 ' >{audioTitle}</h1>
                                        </div>
                                        <div>
                                            <a href={urlResult} className=' text-yellow-200 underline'>
                                                Click hear to download audio
                                            </a>
                                        </div>
                                        <div className='flex justify-end content-end mt-6'>
                                            <PrimaryButton
                                            className=' bg-slate-700 hover:bg-slate-600 dark:text-white' 
                                            children="convert next audio"
                                            onClick={() => {setUrlResult(null), setLoading(false)}}
                                            />
                                        </div>
                                    </div>
                                    
                                ) : (
                                    <div>
                                    <TextInput ref={inputUrlRef} placeholder="Add YouTube link here" className='dark:border-gray-400 w-full' />
                                    <div>
                                        {apiErrors ? <p className='text-red-400'>{apiErrors}</p> : null}
                                        {error && <p className="text-red-400">{error}</p>}
                                    </div>
                                    
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
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
