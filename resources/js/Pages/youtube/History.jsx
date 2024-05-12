import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';
import axios from 'axios';
import { youtube_parser } from './Utils';

export default function History({ auth }){
    const {history} = usePage().props;

    
    const handleMP3Download = async (e) => {
        e.preventDefault();

        const url = e.target.value;
        const youtubeID = youtube_parser(url);

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

            if (response.data.link) {
                window.location.href = response.data.link;
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    const handleMP4Download = async (e) => {
        e.preventDefault();
        

        
        const url = e.target.value;
        const youtubeID = youtube_parser(url);

        try {
            const response = await axios.get('https://ytstream-download-youtube-videos.p.rapidapi.com/dl', {
                headers: {
                    'X-RapidAPI-Key': '30adb9c080msh002b87e1a39b208p13c8dajsne572b73c2831',
                    'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
                },
                params: {
                    id: youtubeID
                }
            });

            //console.log(response.data.formats[0].url);

            if (response.data.formats[0].url) {
                window.open(response.data.formats[0].url, '_blank');
            }
            
        } catch (err) {
            console.error(err);
        }
    }



    const historyDataJSX = history.map((item, index) => {
        return(
            <div key={index} className='bg-gray-700 rounded-md shadow-sm shadow-teal-800 border border-gray-600 p-2 flex flex-col gap-5 sm:flex-row sm:justify-between'>
                <div className='font-bold text-3xl text-white sm:content-center text-center sm:text-start'>
                    <h1>{item.title}</h1>
                </div>
                <div className='flex sm:flex-col gap-4 text-nowrap flex-row justify-center '>
                    <button value={item.url} onClick={handleMP3Download} className='font-semibold text-md text-white uppercase bg-blue-500 p-2 rounded-md focus:bg-blue-500 hover:bg-blue-400 active:bg-blue-400 transition ease-in-out duration-150 '>download mp3</button>
                    <button value={item.url} onClick={handleMP4Download} className='font-semibold text-md text-white uppercase bg-blue-500 p-2 rounded-md focus:bg-blue-500 hover:bg-blue-400 active:bg-blue-400 transition ease-in-out duration-150' >download mp4</button>
                </div>
            </div>
        );
    });

    return(
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Nigger</h2>}
            >
                <Head title="history" />

                <div className=' w-full h-full grid'>
                    <div className=''>
                        <div className='m-4 grid gap-4 bg-slate-800 p-4 shadow-2xl shadow-slate-800 rounded-lg border border-slate-700'>
                            <h1 className='text-center text-4xl text-white font-bold'>download history</h1>
                            {historyDataJSX}
                        </div>
                    </div>
                </div>

            </AuthenticatedLayout>
        </>
        
    )

}