import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function History({ auth }){

    return(
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Nigger</h2>}
            >
                <Head title="onichina" />

                <div>
                    <h1>this is history mf</h1>
                </div>

            </AuthenticatedLayout>
        </>
        
    )

}