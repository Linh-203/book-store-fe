type Props = {
   sreenSize?: 'md' | 'lg';
};
const Loading = ({ sreenSize }: Props) => {
   return (
      <div
         className={`flex justify-center items-center w-full h-full relative ${sreenSize === 'md' && 'min-h-[500px]'} ${
            sreenSize === 'lg' && 'min-h-[1000px]'
         }`}
      >
         <div className='relative flex justify-center items-center' />
         <div className='absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500'></div>
         <img
            src='https://scontent.fhan14-1.fna.fbcdn.net/v/t1.15752-9/385550897_1420530008858255_1760137888083412855_n.png?_nc_cat=101&ccb=1-7&_nc_sid=8cd0a2&_nc_ohc=ythaKJ9WBrQAX9UANG_&_nc_ht=scontent.fhan14-1.fna&oh=03_AdQ2UR1CzaMfAQ71e5fKwNcqERqpnMLJjPnEG27_LELP2w&oe=657272CC'
            className='rounded-full h-28 w-28'
         />
      </div>
   );
};

export default Loading;
