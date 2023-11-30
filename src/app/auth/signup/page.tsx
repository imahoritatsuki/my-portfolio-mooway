import SignupForm from '@/app/components/auth/SignupForm'
import React from 'react'
import { readUserSession } from '../../../../lib/supabase/readUserSession';
import { redirect } from 'next/navigation';

const page = async () => {
  const { data: user } = await readUserSession();

	if (user.session) {
		return redirect("/chat");
	}
  
  return (
    <SignupForm />
  )
}

export default page