import React from 'react'
import { createSupbaseServerClientReadOnly } from '.';
import { add, startOfDay } from 'date-fns';

export const getBullshitAreaData = async () => {
  const supabase = await createSupbaseServerClientReadOnly()
  const { data: userSession } = await supabase.auth.getSession();
  const { data: { user } } = await supabase.auth.getUser();

  // 現在の日本時間を取得
  const nowJst = new Date();
  let startTime, endTime;

  if (nowJst.getHours() < 9) {
    // 9時前の場合: 前日の朝9時から今日の朝8:59まで
    const yesterday = add(nowJst, { days: -1 });
    startTime = add(startOfDay(yesterday), { hours: 9 });
    endTime = add(startOfDay(nowJst), { hours: 8, minutes: 59 });
  } else {
    // 9時以降の場合: 今日の朝9時から次の日の朝8:59まで
    startTime = add(startOfDay(nowJst), { hours: 9 });
    const tomorrow = add(nowJst, { days: 1 });
    endTime = add(startOfDay(tomorrow), { hours: 8, minutes: 59 });
  }


  let { data: USER_MESSAGES } = await supabase
    .from('USER_MESSAGES')
    .select(`
      id,
      content,
      created_at,
      bullshit_title,
      bullshit_description,
      bullshit_solution,
      AI_MESSAGES (
        content
      )
    `)
    .neq('bullshit_title', null)
    .gte('created_at', startTime.toISOString())
    .lt('created_at', endTime.toISOString())
    .order('created_at', { ascending: true });

  let bullshitMessages = USER_MESSAGES || []

  return bullshitMessages
}