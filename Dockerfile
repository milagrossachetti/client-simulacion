FROM node:24

# Crear y usar el directorio de trabajo
WORKDIR /app

# Copiar solo los archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto del dev server de Vite (por defecto es 5173)
EXPOSE 5173

# Comando para desarrollo
CMD ["npm", "run", "dev"]
