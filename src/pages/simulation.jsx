import Navbar from "../components/navbar";
import { Droplets, Sun, Trees, FlaskConical, Leaf, Calendar, SquareSquare, CalendarDays } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocation } from 'react-router-dom';


const Simulation = () => {

    const location = useLocation();
    const resultado = location.state?.resultado;
    const floracionFecha = location.state?.floracionFecha;
    const simulacionFecha = location.state?.simulacionFecha;
    const ha = location.state?.ha;
    const nombreAgroquimico = location.state?.nombreAgroquimico;

    const datosFiltrados = resultado.map(item => ({
        fecha: new Date(item.fecha).toLocaleDateString('es-AR'),
        grado: item.grado_ataque
    }));

    const diasCalidos = resultado.reduce((contador, item) => {
        return item.dia_calido ? contador + 1 : contador;
    }, 0);

    const diasHumedos = resultado.reduce((contador, item) => {
        return item.dia_humedo ? contador + 1 : contador;
    }, 0);

    const diasSimulados = resultado.length;

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
                            <p className="text-base font-bold text-black">{nombreAgroquimico}</p>
                        </div>
                        <div className="mt-4 w-1/4">
                            <div className="flex items-center gap-2 mb-2">
                                <Leaf className="h-4 w-4 text-gray-500" />
                                <p className='text-gray-500 font-sans'>Inicio Floración</p>
                            </div>
                            <p className="text-base font-bold text-black">{new Date(floracionFecha).toLocaleDateString('es-AR')}</p>
                        </div>
                        <div className="mt-4 w-1/4">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <p className='text-gray-500 font-sans'>Inicio Simulación</p>
                            </div>
                            <p className="text-base font-bold text-black">{new Date(simulacionFecha).toLocaleDateString('es-AR')}</p>
                        </div>
                        <div className="mt-4 w-1/4">
                            <div className="flex items-center gap-2 mb-2">
                                <SquareSquare className="h-4 w-4 text-gray-500" />
                                <p className='text-gray-500 font-sans'>Hectareas</p>
                            </div>
                            <p className="text-base font-bold text-black">{ha}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-4 mt-4 mb-4">
                    <div
                        className="w-1/4 flex flex-row gap-4 border rounded border-blue-100 p-4 bg-blue-100 shadow-md justify-between">
                        <div>
                            <p className="font-semibold text-blue-900">Días Húmedos</p>
                            <p className="text-3xl font-bold text-blue-900">{diasHumedos}</p>
                        </div>
                        <div className="bg-blue-200 rounded p-2 self-center">
                            <Droplets className="text-blue-900" />
                        </div>
                    </div>
                    <div className="w-1/4 flex flex-row gap-4 border rounded border-orange-100 p-4 bg-orange-100 shadow-md justify-between">
                        <div>
                            <p className="font-semibold text-orange-900">Días Cálidos</p>
                            <p className="text-3xl font-bold text-orange-900">{diasCalidos}</p>
                        </div>
                        <div className="bg-orange-200 rounded p-2 self-center">
                            <Sun className="text-orange-900" />
                        </div>
                    </div>
                    <div className="w-1/4 flex flex-row gap-4 border rounded border-green-100 p-4 bg-green-100 shadow-md justify-between">
                        <div>
                            <p className="font-semibold text-green-900">Árboles Observados</p>
                            <p className="text-3xl font-bold text-green-900">{resultado[0].arboles_observados}</p>
                        </div>
                        <div className="bg-green-200 rounded p-2 self-center">
                            <Trees className="text-green-900" />
                        </div>
                    </div>
                    <div className="w-1/4 flex flex-row gap-4 border rounded border-violet-100 p-4 bg-violet-100 shadow-md justify-between">
                        <div>
                            <p className="font-semibold text-violet-900">Días Simulados</p>
                            <p className="text-3xl font-bold text-violet-900">{diasSimulados}</p>
                        </div>
                        <div className="bg-violet-200 rounded p-2 self-center">
                            <CalendarDays className="text-violet-900" />
                        </div>
                    </div>
                </div>
                <div className="w-full h-96 p-4 bg-white rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Grado por Fecha</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={datosFiltrados}>
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