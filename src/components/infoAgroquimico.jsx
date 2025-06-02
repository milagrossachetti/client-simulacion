import Navbar from "../components/navbar";
import { Shield, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocation } from 'react-router-dom';


const InfoAgroquimico = ({ agroquimico }) => {
    /**
     * 
    {
    "id": 0,
    "producto": "string",
    "disminucion_grado_ataque": 0,
    "media_inmunidad": 0,
    "desviacion_inmunidad": 0,
    "periodo_carencia": 0,
    "tiempo_entre_aplicaciones": 0
    }
     */

    return (
        <>
            <div className="bg-white border rounded border-gray-100 mt-4 p-4 shadow-md">
                <div className="flex flex-col ">
                    <p className="font-semibold text-black-900">Información sobre el agroquímico utilizado</p>
                    <p className='font-extralight text-md'>{agroquimico.producto}</p>
                </div>
                <div className="flex flex-row gap-4 mt-4 mb-4">
                    <div
                        className="w-1/4 flex flex-row gap-4 rounded p-4 bg-blue-100">
                        <Shield className="text-blue-900 self-center" />
                        <div>
                            <p className="font-normal text-blue-900">Reducción de Ataque</p>
                            <p className="text-xl font-bold text-blue-900">{agroquimico.disminucion_grado_ataque}</p>
                        </div>
                        
                    </div>
                    <div
                        className="w-1/4 flex flex-row gap-4 rounded p-4 bg-orange-100">
                        <Clock className="text-orange-900 self-center" />
                        <div>
                            <p className="font-normal text-orange-900">Media de Inmunidad</p>
                            <p className="text-xl font-bold text-orange-900">{agroquimico.media_inmunidad}</p>
                        </div>
                    </div>
                    <div
                        className="w-1/4 flex flex-row gap-4 rounded p-4 bg-green-100">
                        <Clock className="text-green-900 self-center" />
                        <div>
                            <p className="font-normal text-green-900">Periodo de Carencia</p>
                            <p className="text-xl font-bold text-green-900">{agroquimico.periodo_carencia}</p>
                        </div>
                    </div>
                    <div
                        className="w-1/4 flex flex-row gap-4 rounded p-4 bg-violet-100">
                        <Clock className="text-violet-900 self-center" />
                        <div>
                            <p className="font-normal text-violet-900">Tiempo entre aplicaciones</p>
                            <p className="text-xl font-bold text-violet-900">{agroquimico.tiempo_entre_aplicaciones}</p>
                        </div>
                        
                    </div>
                </div>

            </div>
        </>
    )

}

export default InfoAgroquimico;