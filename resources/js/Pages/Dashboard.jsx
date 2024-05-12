import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Link, router } from '@inertiajs/react';

export default function Dashboard({ auth }) {

    useEffect(() => {
        router.get('/mp3');
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Nigger</h2>}
        >
            <Head title="onichina" />

                

        </AuthenticatedLayout>
    );
}
