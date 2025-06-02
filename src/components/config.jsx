import { ChartColumn, Leaf, FlaskConical, Calendar, SquareSquare, Info } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form"

const Config = () => {
    const [agroquimicoSeleccionado, setAgroquimicoSeleccionado] = useState("");
    const [fechaInicioFloracion, setFechaInicioFloracion] = useState("");
    const [fechaInicioSimulacion, setFechaInicioSimulacion] = useState("");
    const [hectareasCultivo, setHectareasCultivo] = useState("")
    const [agroquimicos, setAgroquimicos] = useState([]);
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            id_agroquimico: "",
            hectareas: 0,
            fecha_inicio: "",
            fecha_floracion: ""
        },
    })

    const obtenerAgroquimicos = async () => {
        try {
            const response = await fetch(`http://localhost:8080/tratamientos-sanitarios`, {
                method: 'GET'
            });
            if (response.ok) {
                const agroquimicos = await response.json();
                setAgroquimicos(agroquimicos);
            } else {
                console.error('Error al obtener los agroquímicos');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
        }
    };

    useEffect(() => {
        obtenerAgroquimicos();
    }, []);

    const onSubmit = async (data) => {
        const jsonParaEnviar = {
            id_tratamiento: parseInt(data.id_tratamiento),
            hectareas: parseInt(data.hectareas),
            fecha_inicio: data.inicioSimulacion,
            fecha_floracion: data.inicioFloracion
        };
        try {
            const response = await fetch("http://localhost:8080/simular", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonParaEnviar)
            });

            if (response.ok) {
                const result = await response.json();
                navigate('/simulation', {
                    state: {
                        resultado: result,
                        floracionFecha: fechaInicioFloracion,
                        simulacionFecha: fechaInicioSimulacion,
                        ha: hectareasCultivo,
                        agroq: agroquimicoElegido

                    }
                }); //pasar datos al componente simulation
            } else {
                const errorText = await response.json();
                setError(errorText.detail);
            }
        } catch (error) {
            setError("Error en la comunicación con el backend: " + error.message);
        }
    };

    const agroquimicoElegido = agroquimicos.find(
        a => a.id === Number(agroquimicoSeleccionado)
    ) || "";

    const handleChange = (e) => {
        setAgroquimicoSeleccionado(e.target.value);
    };

    const handleFechaInicioFloracion = (e) => {
        setFechaInicioFloracion(e.target.value);
    }

    const handleFechaInicioSimulacion = (e) => {
        setFechaInicioSimulacion(e.target.value);
    }

    const handleHectareas = (e) => {
        setHectareasCultivo(e.target.value)
    }

    return (
        <>

            <div className='flex flex-row mt-8'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-[60%] bg-white mr-5 ml-30 p-8 rounded-lg shadow-md'>
                    <div>
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
                                {...register("id_tratamiento", { required: "Debe seleccionar un tratamiento" })}
                                id="dropdown"
                                className='p-3 border-1 border-gray-300 rounded w-full'
                                value={agroquimicoSeleccionado}
                                onChange={handleChange}
                            >
                                <option value="" disabled hidden>Seleccione un tratamiento</option>
                                {agroquimicos.map((agroquimico) => (
                                    <option key={agroquimico.id} value={agroquimico.id}>
                                        {agroquimico.producto}
                                    </option>
                                ))}
                            </select>

                            {agroquimicoSeleccionado && (
                                <p className='mt-1 text-gray-700'>
                                    Agroquímico seleccionado: <strong>{agroquimicoElegido.producto}</strong>
                                </p>
                            )}
                            <p className="text-red-500">{errors.id_tratamiento?.message}</p>
                        </div>
                        <div className='mt-6'>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="h-4 w-4 text-black" />
                                <p className='text-md font-medium'>Inicio de la Simulación</p>
                            </div>
                            <input
                                {...register("inicioSimulacion", { required: 'Debe seleccionar la fecha de inicio de la simulación' })}
                                type="date"
                                className='p-3 border-1 border-gray-300 rounded w-full'
                                placeholder="Seleccione la fecha de inicio"
                                min="2025-08-01"
                                max="2025-09-30"
                                onChange={handleFechaInicioSimulacion}
                            />
                            <p className="text-red-500">{errors.inicioSimulacion?.message}</p>
                        </div>

                        <div className='mt-6'>
                            <div className="flex items-center gap-2 mb-2">
                                <Leaf className="h-4 w-4 text-black" />
                                <p className='text-md font-medium'>Inicio de la Floración</p>
                            </div>
                            <input
                                {...register("inicioFloracion", { required: 'Debe seleccionar la fecha de inicio de la floración' })}
                                type="date"
                                className='p-3 border-1 border-gray-300 rounded w-full'
                                placeholder="Seleccione la fecha de inicio"
                                min="2025-10-15"
                                max="2025-11-15"
                                onChange={handleFechaInicioFloracion}
                            />
                            <p className="text-red-500">{errors.inicioFloracion?.message}</p>
                        </div>



                        <div className='mt-6'>
                            <div className="flex items-center gap-2 mb-2">
                                <SquareSquare className="h-4 w-4 text-black" />
                                <p className='text-md font-medium'>Área del Cultivo</p>
                            </div>
                            <input
                                {...register("hectareas", {
                                    required: 'Este campo es obligatorio',
                                    validate: value => parseInt(value) > 0 || 'Debe ser un número mayor a 0'
                                })}
                                type="number"
                                className='p-3 border-1 border-gray-300 rounded w-full'
                                placeholder="Ingrese la cantidad de hectareas"
                                min="2025-08-01"
                                max="2025-09-30"
                                onChange={handleHectareas}
                            />
                            <p className="text-red-500">{errors.hectareas?.message}</p>
                        </div>

                        {error && (
                            <p className="text-red-500 mt-2">
                                {error}
                            </p>
                        )}

                        <div className='mt-6'>
                            <input type="submit" value="Ejecutar Simulación" placeholder='Ejecutar Simulación'
                                className='p-2 border-1 border-gray-400 rounded w-full bg-blue-600 text-white font-bold pt-3 pb-3 hover:bg-blue-700' />
                        </div>
                    </div>
                </form>
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

        </>
    );
};

export default Config;
