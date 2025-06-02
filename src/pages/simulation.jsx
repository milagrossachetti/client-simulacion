import Navbar from "../components/navbar";
import { Droplets, Sun, Trees, FlaskConical, Leaf, Calendar, SquareSquare } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Simulation = () => {

    const data = [
        { fecha: "01/06/2025", grado: 2 },
        { fecha: "02/06/2025", grado: 3 },
        { fecha: "03/06/2025", grado: 1 },
        { fecha: "04/06/2025", grado: 4 },
        { fecha: "05/06/2025", grado: 2 },
        { fecha: "06/06/2025", grado: 3 },
        { fecha: "07/06/2025", grado: 1 },
        { fecha: "08/06/2025", grado: 4 },
        { fecha: "09/06/2025", grado: 2 },
        { fecha: "10/06/2025", grado: 3 },
        { fecha: "11/06/2025", grado: 1 },
        { fecha: "12/06/2025", grado: 4 },
        { fecha: "13/06/2025", grado: 2 },
        { fecha: "14/06/2025", grado: 3 },
        { fecha: "15/06/2025", grado: 1 },
        { fecha: "16/06/2025", grado: 4 },
        { fecha: "17/06/2025", grado: 2 },
        { fecha: "18/06/2025", grado: 3 },
        { fecha: "19/06/2025", grado: 1 },
        { fecha: "20/06/2025", grado: 4 },
        { fecha: "21/06/2025", grado: 2 },
        { fecha: "22/06/2025", grado: 3 },
        { fecha: "23/06/2025", grado: 1 },
        { fecha: "24/06/2025", grado: 4 },
        { fecha: "25/06/2025", grado: 2 },
        { fecha: "26/06/2025", grado: 3 },
        { fecha: "27/06/2025", grado: 1 },
        { fecha: "28/06/2025", grado: 4 },
        { fecha: "29/06/2025", grado: 2 },
        { fecha: "30/06/2025", grado: 3 },
        { fecha: "01/07/2025", grado: 1 },
        { fecha: "02/07/2025", grado: 4 },
        { fecha: "03/07/2025", grado: 2 },
        { fecha: "04/07/2025", grado: 3 },
        { fecha: "05/07/2025", grado: 1 },
        { fecha: "06/07/2025", grado: 4 },
        { fecha: "07/07/2025", grado: 2 },
        { fecha: "08/07/2025", grado: 3 },
        { fecha: "09/07/2025", grado: 1 },
        { fecha: "10/07/2025", grado: 4 }
    ];



    return (
        <>
            <Navbar mostrarBotonVolver={true} titulo={"Resultados de simulación"} subtitulo={"Análisis del comportamiento de cochinilla del olivo"} />
            <div className="ml-30 mr-30">
                <div className="bg-white border rounded border-gray-100 mt-4 p-4 shadow-md">
                    <p className="font-semibold text-black-900">Parámetros de Simulación</p>
                    <div className="flex flex-row gap-4 ">
                        <div className="mt-4 w-1/4">
                            <div className="flex items-center gap-2 mb-2">
                                <FlaskConical className="h-4 w-4 text-gray-500" />
                                <p className='text-gray-500 font-sans'>Agroquímico</p>
                            </div>
                            <p className="text-base font-bold text-black">Aceite Mineral EC 83,3%</p>
                        </div>
                        <div className="mt-4 w-1/4">
                            <div className="flex items-center gap-2 mb-2">
                                <Leaf className="h-4 w-4 text-gray-500" />
                                <p className='text-gray-500 font-sans'>Inicio Floración</p>
                            </div>
                            <p className="text-base font-bold text-black">01/06/2025</p>
                        </div>
                        <div className="mt-4 w-1/4">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <p className='text-gray-500 font-sans'>Inicio Simulación</p>
                            </div>
                            <p className="text-base font-bold text-black">01/09/2025</p>
                        </div>
                        <div className="mt-4 w-1/4">
                            <div className="flex items-center gap-2 mb-2">
                                <SquareSquare className="h-4 w-4 text-gray-500" />
                                <p className='text-gray-500 font-sans'>Hectareas</p>
                            </div>
                            <p className="text-base font-bold text-black">3</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-4 mt-4 mb-4">
                    <div
                        className="w-1/3 flex flex-row gap-4 border rounded border-blue-100 p-4 bg-blue-100 shadow-md justify-between">
                        <div>
                            <p className="font-semibold text-blue-900">Días Húmedos</p>
                            <p className="text-3xl font-bold text-blue-900">12</p>
                        </div>
                        <div className="bg-blue-200 rounded p-2 self-center">
                            <Droplets className="text-blue-900" />
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-row gap-4 border rounded border-orange-100 p-4 bg-orange-100 shadow-md justify-between">
                        <div>
                            <p className="font-semibold text-orange-900">Días Cálidos</p>
                            <p className="text-3xl font-bold text-orange-900">15</p>
                        </div>
                        <div className="bg-orange-200 rounded p-2 self-center">
                            <Sun className="text-orange-900" />
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-row gap-4 border rounded border-green-100 p-4 bg-green-100 shadow-md justify-between">
                        <div>
                            <p className="font-semibold text-green-900">Árboles Observados</p>
                            <p className="text-3xl font-bold text-green-900">584</p>
                        </div>
                        <div className="bg-green-200 rounded p-2 self-center">
                            <Trees className="text-green-900" />
                        </div>
                    </div>
                </div>
                <div className="w-full h-96 p-4 bg-white rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Grado por Fecha</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="fecha" angle={0} textAnchor="end" height={60} />
                            <YAxis domain={[0, 4]} />
                            <Tooltip />
                            <Bar dataKey="grado" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={10} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )

}

export default Simulation;