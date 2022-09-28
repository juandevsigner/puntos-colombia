import EcoShop from "../assets/ecoshopping.webp";

export const Auth = () => {
  const handleClick = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center justify-items-center">
      <form>
        <input
          className="mb-5  border-b border-green-600 w-full p-2 text-center text-xl"
          placeholder="Ingrese su número de cedula"
          type="number"
        />
        <input
          type="submit"
          className="my-3 btn-primary justify-center items-center cursor-pointer"
          value="Comprobar"
          onClick={handleClick}
        />
      </form>
      <img className="w-72" src={EcoShop} alt="ecoshopping" />
    </div>
  );
};
