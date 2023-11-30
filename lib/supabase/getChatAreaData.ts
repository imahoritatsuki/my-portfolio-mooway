import React from 'react'
import { createSupbaseServerClientReadOnly } from '.';

export const getChatAreaData = async () => {
  const supabase = await createSupbaseServerClientReadOnly()
  await supabase.auth.getSession();
  await supabase.auth.getUser();


  let { data: USER_MESSAGES, error } = await supabase
  .from('USER_MESSAGES')
  .select(`
    id,
    content,
    created_at,
    AI_MESSAGES (
      content
    )
  `)
  .order('created_at', { ascending: true });

  let chatMessages = USER_MESSAGES || []

  return chatMessages
}