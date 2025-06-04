import { Calendar } from 'lucide-react';

const CronogramaAplicaciones = ({ datos }) => {

    const cantidadAplicaciones = datos.reduce((contador, item) => {
        return item.aplicacion_tratamiento_fitosanitario ? contador + 1 : contador;
    }, 0);

    const infoAplicaciones = datos
        .filter(dato => dato.aplicacion_tratamiento_fitosanitario)
        .map(dato => ({
            dia: new Date(dato.fecha).toLocaleDateString('es-AR'),
            gradoAtaque: dato.grado_ataque
        }));

    return (
        <>
            <div className="border rounded border-green-100 mt-4 p-4 shadow-md bg-gradient-to-r from-green-50 to-green-100 mb-8">
                <div className='flex flex-row gap-4 w-full justify-between items-center'>
                    <div className="flex flex-row gap-4 items-center">
                        <Calendar className="text-green-700" />
                        <div className='flex flex-col'>
                            <p className="font-semibold text-lg text-green-900">Cronograma de Aplicaciones</p>
                            <p className='font-extralight text-md text-green-700'>
                                Días programados para la aplicación de tratamientos fitosanitarios
                            </p>
                        </div>
                    </div>
                    <p className="font-semibold text-md text-green-900">
                        Total aplicaciones: {infoAplicaciones.length}
                    </p>
                </div>
                <div className='flex flex-row gap-4 '>
                    {Array.from({ length: cantidadAplicaciones }).map((_, i) => (
                        <div key={i} className="flex-1 mt-4 bg-white rounded border border-green-200 p-4">
                            <p className="font-semibold text-md text-green-900">Aplicación #{i + 1}</p>
                            <p className="font-normal text-base text-green-700 mt-2">Día {infoAplicaciones[i].dia}</p>
                            <p className="font-normal text-base text-green-700 mt-1">Grado de ataque: {infoAplicaciones[i].gradoAtaque}</p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default CronogramaAplicaciones;