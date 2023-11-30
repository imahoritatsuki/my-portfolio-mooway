import LeftSide from '../components/chat/leftSide/LeftSide'
import ChatArea from '../components/chat/main/ChatArea'
import { redirect } from 'next/navigation';
import { createSupbaseServerClientReadOnly } from '../../../lib/supabase';
import { Suspense } from 'react';

const page = async () => {

  const supabase = await createSupbaseServerClientReadOnly()
  const { data: userSession } = await supabase.auth.getSession();
  
        
	if (!userSession.session) {
		return redirect("/auth/login");
	}

  return (
    <div className='h-full'> 
          <div className='flex h-full'>
            <div className='w-1/4 h-full hidden lg:block'>
              <Suspense >
                <LeftSide />
              </Suspense>
            </div>
            <div className='w-full h-full bg-chat-bgMain lg:w-3/4'>
              <Suspense >
                <ChatArea />
              </Suspense>
            </div>
          </div>
    </div>
  );
};


export default page