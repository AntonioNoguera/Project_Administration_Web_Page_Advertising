-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2023 a las 10:45:01
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `industrialesdelpacífico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citasregistradas`
--

CREATE TABLE `citasregistradas` (
  `nCita` int(100) NOT NULL,
  `empresa` varchar(80) NOT NULL,
  `representante` varchar(80) NOT NULL,
  `correo` varchar(80) NOT NULL,
  `fecha` varchar(15) NOT NULL,
  `hora` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citasregistradas`
--

INSERT INTO `citasregistradas` (`nCita`, `empresa`, `representante`, `correo`, `fecha`, `hora`) VALUES
(1, 'representanterepresentanterepresentanterepresentanterepresentante', 'representanterepresentanterepresentanterepresentanterepresentante', 'representanterepresentanterepresentanterepresentante', '2023-04-28', '02:47,');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `citasregistradas`
--
ALTER TABLE `citasregistradas`
  ADD PRIMARY KEY (`nCita`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `citasregistradas`
--
ALTER TABLE `citasregistradas`
  MODIFY `nCita` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
