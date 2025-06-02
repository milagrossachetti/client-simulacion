import { ChartColumn, Leaf, FlaskConical, Calendar, SquareSquare, Info } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form"

const Config = () => {


    const [agroquimicoSeleccionado, setAgroquimicoSeleccionado] = useState("");
    const [fechaInicioFloracion, setFechaInicioFloracion] = useState("");
    const [fechaInicioSimulacion, setFechaInicioSimulacion] = useState("");
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            agroquimico: "",
            inicioFloracion: "",
            inicioSimulacion: "",
            hectareas: 0
        },
    })


    const agroquimicos = [
        { producto: 'Aceite Mineral EC 83,3%', potencia: 'Media' },
        { producto: 'Aceite de soja refinado 85%', potencia: 'Baja' },
        { producto: 'Carbaril WP 85%', potencia: 'Media' },
        { producto: 'Carbosulfan EC 25%', potencia: 'Alta' },
        { producto: 'Clorpirifos EC 48%', potencia: 'Alta' },
        { producto: 'Dimetoato EC 50%', potencia: 'Alta' },
        { producto: 'Medidation EC 40%', potencia: 'Muy Alta' },
    ];

    const handleChange = (e) => {
        setAgroquimicoSeleccionado(e.target.value);
    };

    const handleFechaInicioFloracion = (e) => {
        setFechaInicioFloracion(e.target.value);
        console.log(e.target.value);
    }

    const handleFechaInicioSimulacion = (e) => {
        setFechaInicioSimulacion(e.target.value);
        console.log(e.target.value);
    }

    return (
        <>
            <form onSubmit={handleSubmit(console.log)}>
                <div className='flex flex-row mt-8'>
                    <div className='w-[60%] bg-white mr-5 ml-30 p-8 rounded-lg shadow-md'>
                        <div className='flex flex-row gap-3'>
                            <div className='bg-blue-100 p-2 h-10 mt-2 rounded-lg'>
                                <ChartColumn className="h-6 w-6 text-blue-600 bg" />
                            </div>
                            <div>
                                <p className='text-xl font-medium'>Configuración de Simulación</p>
                                <p className='font-extralight'>Configure los parámetros para simular el comportamiento de la cochinilla</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center gap-2 mb-2">
                                <FlaskConical className="h-4 w-4 text-black" />
                                <p className='text-md font-medium'>Agroquímico de control</p>
                            </div>
                            <select
                                {...register("agroquimico", {
                                    required: true,
                                })}
                                id="dropdown"
                                className='p-3 border-1 border-gray-300 rounded w-full'
                                value={agroquimicoSeleccionado}
                                onChange={handleChange}
                            >
                                {agroquimicos.map((agroquimico, index) => (
                                    <option key={index} value={agroquimico.producto}>
                                        {agroquimico.producto} - {agroquimico.potencia}
                                    </option>
                                ))}
                            </select>

                            {agroquimicoSeleccionado && (
                                <p className='mt-1 text-gray-700'>
                                    Seleccionaste: <strong>{agroquimicoSeleccionado}</strong>
                                </p>
                            )}
                        </div>

                        <div className='mt-6'>
                            <div className="flex items-center gap-2 mb-2">
                                <Leaf className="h-4 w-4 text-black" />
                                <p className='text-md font-medium'>Inicio de la Floración</p>
                            </div>
                            <input
                                {...register("inicioFloracion", { required: 'La fecha de inicio de floración no puede ser nula' })}
                                type="date"
                                className='p-3 border-1 border-gray-300 rounded w-full'
                                placeholder="Seleccione la fecha de inicio"
                                onChange={handleFechaInicioFloracion}
                            />
                            <p className="error-message">{errors.inicioFloracion?.message}</p>
                        </div>

                        <div className='mt-6'>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-black" />
                                <p className='text-md font-medium'>Inicio de la Simulación</p>
                            </div>
                            <input
                                {...register("inicioSimulacion", { required: true })}
                                type="date"
                                className='p-3 border-1 border-gray-300 rounded w-full'
                                placeholder="Seleccione la fecha de inicio"
                                min="2025-08-01"
                                max="2025-09-30"
                                onChange={handleFechaInicioSimulacion}
                            />
                        </div>

                        <div className='mt-6'>
                            <div className="flex items-center gap-2 mb-2">
                                <SquareSquare className="h-4 w-4 text-black" />
                                <p className='text-md font-medium'>Área del Cultivo</p>
                            </div>
                            <input
                                {...register("hectareas", { required: true })}
                                type="number"
                                className='p-3 border-1 border-gray-300 rounded w-full'
                                placeholder="Ingrese la cantidad de hectareas"
                                min="2025-08-01"
                                max="2025-09-30"
                                onChange={handleFechaInicioSimulacion}
                            />
                        </div>

                        <div className='mt-6'>
                            <input type="submit" value="Ejecutar Simulación" placeholder='Ejecutar Simulación'
                                className='p-2 border-1 border-gray-400 rounded w-full bg-blue-600 text-white font-bold pt-3 pb-3'
                                onClick={() => navigate('/simulation')} />
                        </div>
                    </div>
                    <div className="bg-white mr-30 p-5 rounded-lg shadow-md h-auto self-start">
                        <div className="flex items-center gap-2 mb-2 mb-6 mt-2">
                            <Info className="h-5 w-5 text-black" />
                            <p className='text-lg font-medium'>Guía Rápida</p>
                        </div>
                        <div>
                            <p className='mb-2'><strong>1.</strong> Seleccione el agroquímico según su estrategia de control</p>
                            <p className='mb-2'><strong>2.</strong> Indique cuándo inicia la floración en su cultivo</p>
                            <p className='mb-2'><strong>3.</strong> Elija la fecha de inicio de simulación</p>
                            <p className='mb-2'><strong>4.</strong> Especifique el área total a simular</p>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Config;
