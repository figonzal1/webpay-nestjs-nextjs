const Error = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center gap-3">
        <h1 className="text-2xl font-bold">Estado del pago transbank</h1>
        <div className="bg-red-500 py-3 px-5 rounded-xl">
          <h1 className="font-bold">Pago fallido</h1>
        </div>
      </div>
    </>
  );
};

export default Error;
