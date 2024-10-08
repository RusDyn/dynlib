import Image from 'next/image';

const NoItemComponent = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-center">
      <div className="w-[400px]">
        <Image src="/images/empty.png" alt="Empty" width={400} height={200} />
        {children}
      </div>
    </div>
  );
};

export { NoItemComponent };
