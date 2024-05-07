import type { PageServerLoad } from './$types';

export const load: PageServerLoad  = async ({ cookies }) => {
    const userEmail = cookies.get('userEmail');
    return { 
        props: { userEmail } 
    };
};