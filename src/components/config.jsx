import { ChartColumn, Flower2, FlaskConical, Calendar, SquareSquare, Info, TriangleAlert } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from "react-hook-form";

const Config = () => {
    const [agroquimicoSeleccionado, setAgroquimicoSeleccionado] = useState("");
    const [fechaInicioFloracion, setFechaInicioFloracion] = useState("");
    const [fechaInicioSimulacion, setFechaInicioSimulacion] = useState("");
    const [hectareasCultivo, setHectareasCultivo] = useState("")
    const [agroquimicos, setAgroquimicos] = useState([]);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState(null);
    const navigate = useNavigate();
    const recomendaciones = [
        "Grado promedio ≥ 2.0: Aplicación inmediata",
        "Grado promedio ≥ 1.5: Aplicación preventiva",
        "Considera el período de carencia antes de floración",
        "Respeta el tiempo mínimo entre aplicaciones"
    ];
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
            const response = await fetch(`https://sim-tfi-backend.onrender.com/tratamientos-sanitarios`, {
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
        setLoading(true)
        setResultado(null)
        const jsonParaEnviar = {
            id_tratamiento: parseInt(data.id_tratamiento),
            hectareas: parseInt(data.hectareas),
            fecha_inicio: data.inicioSimulacion,
            fecha_floracion: data.inicioFloracion
        };
        try {
            const response = await fetch("https://sim-tfi-backend.onrender.com/simular", {
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
        } finally {
            setLoading(false)
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
                <form onSubmit={handleSubmit(onSubmit)} className='w-[90%] bg-white mr-5 ml-30 p-8 rounded-lg shadow-md'>
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
                                className='p-3 border-1 border-gray-300 rounded w-full '
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
                                <Flower2 className="h-4 w-4 text-black" />
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
                                    validate: value => {
                                        const num = parseInt(value);
                                        if (isNaN(num)) return 'Debe ser un número válido';
                                        if (num <= 0) return 'Debe ser un número mayor a 0';
                                        if (num > 1000) return 'Debe ser un número menor o igual a 1000';
                                        return true;
                                    }
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
                            <input
                                type="submit"
                                value={loading ? "Realizando simulación..." : "Ejecutar Simulación"}
                                disabled={loading}
                                className={`p-2 rounded w-full font-bold pt-3 pb-3 transition-all
      ${loading ? "bg-blue-500 cursor-not-allowed text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                            />
                            {loading && (
                                <div className="flex items-center justify-center mt-2">
                                    <div className="spinner mr-2" />
                                    <span className="text-sm text-gray-600">Simulando, por favor espere...</span>
                                </div>
                            )}
                        </div>

                    </div>
                </form>
                <div>
                    <div className="bg-white mr-30 p-5 rounded-lg shadow-md h-auto self-start">
                        <div className="flex items-center gap-2 mb-2 mt-2">
                            <Info className="h-5 w-5 text-black" />
                            <p className='text-base font-medium'>Guía Rápida</p>
                        </div>
                        <div>
                            <p className='mb-2 text-sm'><strong>1.</strong> Seleccione el agroquímico según su estrategia de control</p>
                            <p className='mb-2 text-sm'><strong>2.</strong> Elija la fecha de inicio de simulación</p>
                            <p className='mb-2 text-sm'><strong>3.</strong> Indique cuándo inicia la floración en su cultivo</p>
                            <p className='mb-2 text-sm'><strong>4.</strong> Especifique el área total a simular <strong className='text-red-600'>(hasta 1000 ha)</strong></p>
                            <p className='mb-2 text-sm'><strong>5.</strong> El sistema calculará automáticamente:</p>
                            <p className='mb-2 ml-4 text-sm'><strong>-</strong> Grado de ataque inicial por lupeo</p>
                            <p className='mb-2 ml-4 text-sm'><strong>-</strong> Propagación diaria considerando factores climáticos, la eclosión de huevos y el grado inicial</p>
                            <p className='mb-2 ml-4 text-sm'><strong>-</strong> Día óptimo de aplicación de tratamientos fitosanitarios</p>
                        </div>
                    </div>
                    <div className="bg-orange-100 mr-30 p-5 rounded-lg shadow-md h-auto self-start mt-4">
                        <div className="flex items-center gap-2 mb-2 mt-2">
                            <TriangleAlert className="h-5 w-5 text-orange-600" />
                            <p className='text-base font-medium text-orange-800'>Criterios de aplicación automática</p>
                        </div>
                        <div>
                            <ul>
                                {recomendaciones.map((item, index) => (
                                    <li key={index} className='mb-2 text-sm text-orange-800'>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Config;
