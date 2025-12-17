import React from 'react';
import RecentItem from './RecentItem';

const RecentList: React.FC = () => {
  const recentItems = [
    {
      question: "Who will be Trump’s secretary of defense?",
      timeAgo: "2m",
      userName: "bludclat",
      action: "sold",
      price: "0.000032 BTC",
      imageSrc: "https://placehold.co/16x16",
      status: "yes",
    },
    {
      question: "Who will be Trump’s secretary of defense?",
      timeAgo: "2m",
      userName: "bomboclart",
      action: "sold",
      price: "0.000032 BTC",
      imageSrc: "https://placehold.co/16x16",
      status: "no",
    },
    {
      question: "Who will be Trump’s secretary of defense?",
      timeAgo: "2m",
      userName: "succlart",
      action: "sold",
      price: "0.000032 BTC",
      imageSrc: "https://placehold.co/16x16",
      status: "funded",
    },
    {
        question: "Who will be Trump’s secretary of defense?",
        timeAgo: "2m",
        userName: "irvanwibowo",
        action: "sold",
        price: "0.000032 BTC",
        imageSrc: "https://placehold.co/16x16",
        status: "yes",
      },
      {
        question: "Who will be Trump’s secretary of defense?",
        timeAgo: "2m",
        userName: "irvanwibowo",
        action: "sold",
        price: "0.000032 BTC",
        imageSrc: "https://placehold.co/16x16",
        status: "no",
      },
      {
        question: "Who will be Trump’s secretary of defense?",
        timeAgo: "2m",
        userName: "irvanwibowo",
        action: "sold",
        price: "0.000032 BTC",
        imageSrc: "https://placehold.co/16x16",
        status: "funded",
      },
      {
        question: "Who will be Trump’s secretary of defense?",
        timeAgo: "2m",
        userName: "irvanwibowo",
        action: "sold",
        price: "0.000032 BTC",
        imageSrc: "https://placehold.co/16x16",
        status: "yes",
      },
  ] as const;

  return (
    <div className="self-stretch rounded-2xl flex flex-col justify-start items-start gap-2">
      {recentItems.map((item, index) => (
        <RecentItem key={index} {...item} />
      ))}
    </div>
  );
};

export default RecentList;
