import { Leaf, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router';
import '../index.css'

const Navbar = ({ mostrarBotonVolver = false, titulo, subtitulo }) => {
  const navigate = useNavigate();

  const handleVolver = () => {
    navigate(-1);
  };
  return (
    <>
      <div className='flex flex-row justify-between w-full pt-5 pb-5 pl-30 gap-4 bg-white border-b-2 border-gray-200'>
        <div className='flex flex-row gap-4'>
          <div className="p-2 h-10 mt-2 bg-emerald-100 rounded-lg">
            <Leaf className="h-6 w-6 text-emerald-600" />
          </div>
          <div className='flex flex-col justify-center'>
            <h1 className='text-2xl font-bold'>{titulo}</h1>
            <p className='font-extralight text-lg'>{subtitulo}</p>
          </div>
        </div>
        {mostrarBotonVolver && (
          <button
            onClick={handleVolver}
            className="flex items-center border rounded border-gray-300 pl-4 pr-4 pt-2 pb-2 self-center mr-30"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Volver
          </button>
        )}
      </div>
    </>
  );
}

export default Navbar;