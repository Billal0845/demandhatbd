-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2026 at 07:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `surabils_shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(47, 15, 19, 1, '2025-12-23 04:23:52', '2025-12-23 04:23:52'),
(48, 15, 21, 2, '2025-12-23 04:23:52', '2025-12-23 04:23:52'),
(81, 22, 24, 3, '2026-01-12 02:39:17', '2026-01-12 02:39:20');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(4, 'Gadgets', '2025-12-03 00:39:30', '2025-12-09 22:15:19'),
(5, 'Stationary', '2025-12-03 00:39:42', '2025-12-03 00:39:42'),
(9, 'Skin Care', '2025-12-09 22:14:44', '2025-12-09 22:14:44'),
(10, 'Electronicss', '2025-12-09 22:15:31', '2025-12-09 22:15:31'),
(11, 'Winter Clothes', '2025-12-09 22:15:51', '2025-12-09 22:15:51'),
(12, 'Utensil', '2025-12-09 22:15:59', '2025-12-09 22:15:59'),
(13, 'Kid Fashion', '2025-12-09 22:16:12', '2025-12-09 22:16:23'),
(14, 'Sun Glass', '2025-12-09 22:16:37', '2025-12-09 22:16:37'),
(15, 'Formal Dresses', '2025-12-09 22:17:06', '2025-12-09 22:23:35'),
(16, 'Men\'s Fashion', '2025-12-09 22:22:46', '2025-12-09 22:22:46'),
(17, 'Wedding Dress', '2025-12-09 22:24:15', '2025-12-09 22:24:15'),
(18, 'Gymnast', '2025-12-11 04:51:18', '2025-12-14 07:26:54'),
(19, 'Medicine', '2025-12-14 07:26:23', '2025-12-14 07:26:23'),
(20, 'Mizanur Rahman', '2025-12-23 03:30:26', '2025-12-23 03:30:26');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `hero_images`
--

CREATE TABLE `hero_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hero_images`
--

INSERT INTO `hero_images` (`id`, `image`, `created_at`, `updated_at`) VALUES
(1, 'HeroImages/OXRvvitEjDgLT0YnyLP0jmGbnev0lCAh275y9sGb.png', '2026-01-13 11:56:35', '2026-01-13 11:56:35'),
(2, 'HeroImages/tdjVctRXtKUU4ShNMigBbtYJfPaB55eDpJKFi8hm.png', '2026-01-13 11:56:54', '2026-01-13 11:56:54'),
(3, 'HeroImages/zgwtnQnhzBM4GyTc1sLUQDLiAoC1dqAqqBAdsOXy.png', '2026-01-13 11:57:04', '2026-01-13 11:57:04');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_12_02_180739_create_categories_table', 2),
(6, '2025_12_03_064206_create_products_table', 3),
(11, '2025_12_08_042121_add_fields_to_users_table', 4),
(12, '2025_12_08_085515_create_personal_access_tokens_table', 4),
(13, '2025_12_11_042923_add_extra_info_to_products_table', 5),
(14, '2025_12_11_083955_create_carts_table', 6),
(15, '2025_12_12_104513_create_orders_table', 7),
(16, '2025_12_12_104515_create_order_items_table', 7),
(17, '2025_12_13_054355_add_transaction_id_to_orders_table', 8),
(18, '2026_01_11_132555_create_hero_images_table', 9);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `delivery_fee` decimal(10,2) NOT NULL,
  `grand_total` decimal(10,2) NOT NULL,
  `payment_method` varchar(255) NOT NULL DEFAULT 'cod',
  `transaction_id` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) NOT NULL DEFAULT 'pending',
  `order_status` varchar(255) NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `name`, `email`, `phone`, `address`, `subtotal`, `delivery_fee`, `grand_total`, `payment_method`, `transaction_id`, `payment_status`, `order_status`, `created_at`, `updated_at`) VALUES
(5, 11, 'Md. Asirul Islam', 'muhammadasirulislam@gmail.com', '01867510845', 'Chockbajar, Rangpur, Parkmor, Rangpur Sadar', 46900.00, 60.00, 46960.00, 'cod', NULL, 'paid', 'delivered', '2025-12-14 06:50:58', '2025-12-29 00:23:26'),
(6, 12, 'Suchi Akter', 'cse12005025brur@gmail.com', '01709789874', 'Kerani Para, CheckPost, Rangpur Sadar, Rangpur', 13900.00, 60.00, 13960.00, 'cod', NULL, 'pending', 'shipped', '2025-12-14 07:19:18', '2025-12-29 00:23:02'),
(7, 13, 'Badhon Rani', 'badhonraniroy@gmail.com', '01706788373', 'Sordar Para, Park Mor, Rangpur', 5300.00, 60.00, 5360.00, 'cod', NULL, 'pending', 'pending', '2025-12-14 23:28:28', '2025-12-14 23:28:28'),
(8, 14, 'Rasel', 'shakhrashel095@gmail.com', '01721100528', 'Sordar Para, Park Mor, Rangpur', 7000.00, 60.00, 7060.00, 'cod', NULL, 'pending', 'pending', '2025-12-22 02:41:29', '2025-12-22 02:41:29'),
(9, 15, 'Mizanur Rahman', 'cse12005010brur@gmail.com', '01709789878', 'Sordar Para, Park Mor, Rangpur', 152100.00, 60.00, 152160.00, 'cod', NULL, 'pending', 'pending', '2025-12-23 03:27:33', '2025-12-23 03:27:33'),
(14, 9, 'Md. Billal Hosen', 'cse138829brur@gmail.com', '01709789875', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 3614.00, 60.00, 3674.00, 'cod', NULL, 'pending', 'pending', '2025-12-27 03:08:40', '2025-12-27 03:08:40'),
(15, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 7200.00, 60.00, 7260.00, 'cod', NULL, 'pending', 'processing', '2025-12-28 03:33:09', '2025-12-28 03:33:09'),
(16, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Dhaka Uttora, Mirpur', 5800.00, 60.00, 5860.00, 'cod', NULL, 'pending', 'shipped', '2025-12-28 07:17:14', '2025-12-31 05:59:25'),
(17, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 4340.00, 60.00, 4400.00, 'cod', NULL, 'pending', 'shipped', '2025-12-28 10:30:43', '2025-12-28 10:30:43'),
(18, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 8500.00, 60.00, 8560.00, 'cod', NULL, 'pending', 'pending', '2026-01-05 00:45:44', '2026-01-05 00:45:44'),
(19, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 1450.00, 60.00, 1510.00, 'stripe', 'pi_3Sm8RP6fP3uK1xj00Lg4fwm3', 'paid', 'processing', '2026-01-05 01:36:19', '2026-01-05 01:53:15'),
(20, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 4000.00, 60.00, 4060.00, 'stripe', NULL, 'pending', 'pending', '2026-01-05 01:48:15', '2026-01-05 01:48:15'),
(21, 9, 'Md. Billal Hosen', 'cse138829brur@gmail.com', '01709789875', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 5910.00, 60.00, 5970.00, 'stripe', 'pi_3SmCJw6fP3uK1xj00GiIgAmj', 'paid', 'pending', '2026-01-05 05:49:46', '2026-01-05 05:51:41'),
(22, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 6000.00, 60.00, 6060.00, 'cod', NULL, 'pending', 'pending', '2026-01-07 00:27:14', '2026-01-07 00:27:14'),
(23, 21, 'Rasel', 'cse139426brur@gmail.com', '01709786983', 'Sordar Para, Park Mor, Rangpur', 8880.00, 60.00, 8940.00, 'stripe', 'pi_3SoGoY6fP3uK1xj01hCSN3Px', 'paid', 'pending', '2026-01-10 23:03:29', '2026-01-10 23:03:50'),
(24, 22, 'Kausar', 'cse12005044brur@gmail.com', '01518310547', 'Sordar Para, Park Mor, Rangpur', 1450.00, 60.00, 1510.00, 'stripe', 'pi_3Soge16fP3uK1xj01M8IEFFC', 'paid', 'pending', '2026-01-12 02:38:27', '2026-01-12 02:38:40'),
(37, 9, 'Md. Billal Hosen', 'cse138829brur@gmail.com', '01709789875', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 2675.00, 60.00, 2735.00, 'stripe', 'pi_3SopN96fP3uK1xj00GCmT6Y6', 'paid', 'pending', '2026-01-12 11:53:38', '2026-01-12 11:57:50'),
(38, 9, 'Md. Billal Hosen', 'cse138829brur@gmail.com', '01709789875', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 1450.00, 60.00, 1510.00, 'stripe', 'pi_3Sp1uL6fP3uK1xj011bsSAlS', 'paid', 'pending', '2026-01-13 01:20:17', '2026-01-13 01:20:57'),
(39, 9, 'Md. Billal Hosen', 'cse138829brur@gmail.com', '01709789875', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 4830.00, 60.00, 4890.00, 'bkash', NULL, 'pending', 'pending', '2026-01-13 08:47:10', '2026-01-13 08:47:10'),
(40, 9, 'Md. Billal Hosen', 'cse138829brur@gmail.com', '01709789875', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 4830.00, 60.00, 4890.00, 'bkash', NULL, 'pending', 'pending', '2026-01-13 11:04:27', '2026-01-13 11:04:27'),
(41, 9, 'Md. Billal Hosen', 'cse138829brur@gmail.com', '01709789875', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 4830.00, 60.00, 4890.00, 'cod', NULL, 'pending', 'pending', '2026-01-13 11:06:08', '2026-01-13 11:06:08'),
(42, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 1430.00, 60.00, 1490.00, 'bkash', NULL, 'pending', 'pending', '2026-01-13 11:07:53', '2026-01-13 11:07:53'),
(43, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 1430.00, 60.00, 1490.00, 'cod', NULL, 'pending', 'pending', '2026-01-13 11:17:10', '2026-01-13 11:17:10'),
(44, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 1450.00, 60.00, 1510.00, 'bkash', 'DAD00O9H7S', 'paid', 'pending', '2026-01-13 11:17:52', '2026-01-13 11:18:42'),
(45, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 2300.00, 60.00, 2360.00, 'bkash', 'DAD90O9HZJ', 'paid', 'pending', '2026-01-13 11:30:45', '2026-01-13 11:31:17'),
(46, 16, 'Billal Hosen', 'engliweb@gmail.com', '01705822867', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', 1430.00, 60.00, 1490.00, 'bkash', 'DAD40O9HZO', 'paid', 'pending', '2026-01-13 11:58:48', '2026-01-13 11:59:36');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `product_name`, `price`, `quantity`, `created_at`, `updated_at`) VALUES
(6, 5, 21, 'Chic Black Leather Barrel Bag', 2850.00, 1, '2025-12-14 06:50:58', '2025-12-14 06:50:58'),
(7, 5, 23, 'Gold Frame Blue Lens Sunglasses', 2050.00, 1, '2025-12-14 06:50:58', '2025-12-14 06:50:58'),
(8, 5, 25, 'Canon EOS DSLR Camera', 42000.00, 1, '2025-12-14 06:50:58', '2025-12-14 06:50:58'),
(9, 6, 21, 'Chic Black Leather Barrel Bag', 2850.00, 1, '2025-12-14 07:19:18', '2025-12-14 07:19:18'),
(10, 6, 26, 'Classic Rainbow Umbrella', 850.00, 1, '2025-12-14 07:19:18', '2025-12-14 07:19:18'),
(11, 6, 29, 'Blue Hydration Skincare Set', 3400.00, 3, '2025-12-14 07:19:18', '2025-12-14 07:19:18'),
(12, 7, 21, 'Chic Black Leather Barrel Bag', 2850.00, 1, '2025-12-14 23:28:28', '2025-12-14 23:28:28'),
(13, 7, 24, 'Copper Lightweight Bomber Jacket', 2450.00, 1, '2025-12-14 23:28:28', '2025-12-14 23:28:28'),
(14, 8, 21, 'Chic Black Leather Barrel Bag', 2850.00, 1, '2025-12-22 02:41:29', '2025-12-22 02:41:29'),
(15, 8, 24, 'Copper Lightweight Bomber Jacket', 2450.00, 1, '2025-12-22 02:41:29', '2025-12-22 02:41:29'),
(16, 8, 26, 'Classic Rainbow Umbrella', 850.00, 2, '2025-12-22 02:41:29', '2025-12-22 02:41:29'),
(17, 9, 19, 'HP Laptop for Digital Work and Study', 74900.00, 2, '2025-12-23 03:27:33', '2025-12-23 03:27:33'),
(18, 9, 22, 'Men\'s Navy Windowpane Blazer', 2300.00, 1, '2025-12-23 03:27:34', '2025-12-23 03:27:34'),
(27, 14, 37, 'Kids\' Heavy Duty Winter Parka', 1245.00, 1, '2025-12-27 03:08:40', '2025-12-27 03:08:40'),
(28, 14, 38, 'Girls\' Red Buffalo Check Shirt', 1135.00, 1, '2025-12-27 03:08:40', '2025-12-27 03:08:40'),
(29, 14, 36, 'Boys\' Red & Blue Plaid Flannel', 1234.00, 1, '2025-12-27 03:08:40', '2025-12-27 03:08:40'),
(30, 15, 21, 'Chic Black Leather Barrel Bag', 2850.00, 1, '2025-12-28 03:33:09', '2025-12-28 03:33:09'),
(31, 15, 22, 'Men\'s Navy Windowpane Blazer', 2300.00, 1, '2025-12-28 03:33:09', '2025-12-28 03:33:09'),
(32, 15, 23, 'Gold Frame Blue Lens Sunglasses', 2050.00, 1, '2025-12-28 03:33:09', '2025-12-28 03:33:09'),
(33, 16, 23, 'Gold Frame Blue Lens Sunglasses', 2050.00, 1, '2025-12-28 07:17:14', '2025-12-28 07:17:14'),
(34, 16, 26, 'Classic Rainbow Umbrella', 850.00, 1, '2025-12-28 07:17:14', '2025-12-28 07:17:14'),
(35, 16, 34, 'Summer Yellow Floral Dress', 1450.00, 2, '2025-12-28 07:17:14', '2025-12-28 07:17:14'),
(36, 17, 31, 'Boys\' Green Overshirt & Chino Set', 1850.00, 1, '2025-12-28 10:30:43', '2025-12-28 10:30:43'),
(37, 17, 37, 'Kids\' Heavy Duty Winter Parka', 1245.00, 2, '2025-12-28 10:30:43', '2025-12-28 10:30:43'),
(38, 18, 34, 'Summer Yellow Floral Dress', 1450.00, 1, '2026-01-05 00:45:44', '2026-01-05 00:45:44'),
(39, 18, 39, 'Women\'s Long Grey Puffer Coat', 2600.00, 2, '2026-01-05 00:45:44', '2026-01-05 00:45:44'),
(40, 18, 31, 'Boys\' Green Overshirt & Chino Set', 1850.00, 1, '2026-01-05 00:45:44', '2026-01-05 00:45:44'),
(41, 19, 34, 'Summer Yellow Floral Dress', 1450.00, 1, '2026-01-05 01:36:19', '2026-01-05 01:36:19'),
(42, 20, 32, 'Girls\' Mustard Knit Sweater & Beanie', 2000.00, 2, '2026-01-05 01:48:15', '2026-01-05 01:48:15'),
(43, 21, 34, 'Summer Yellow Floral Dress', 1450.00, 1, '2026-01-05 05:49:46', '2026-01-05 05:49:46'),
(44, 21, 35, 'Little Fashionista Striped Dress', 1230.00, 2, '2026-01-05 05:49:46', '2026-01-05 05:49:46'),
(45, 21, 32, 'Girls\' Mustard Knit Sweater & Beanie', 2000.00, 1, '2026-01-05 05:49:46', '2026-01-05 05:49:46'),
(46, 22, 32, 'Girls\' Mustard Knit Sweater & Beanie', 2000.00, 3, '2026-01-07 00:27:14', '2026-01-07 00:27:14'),
(47, 23, 33, 'Girls\' Classic Denim Jacket', 1430.00, 1, '2026-01-10 23:03:29', '2026-01-10 23:03:29'),
(48, 23, 40, 'Vibrant Mustard Winter Parka', 3400.00, 1, '2026-01-10 23:03:29', '2026-01-10 23:03:29'),
(49, 23, 23, 'Gold Frame Blue Lens Sunglasses', 2050.00, 1, '2026-01-10 23:03:29', '2026-01-10 23:03:29'),
(50, 23, 32, 'Girls\' Mustard Knit Sweater & Beanie', 2000.00, 1, '2026-01-10 23:03:29', '2026-01-10 23:03:29'),
(51, 24, 34, 'Summer Yellow Floral Dress', 1450.00, 1, '2026-01-12 02:38:27', '2026-01-12 02:38:27'),
(64, 37, 37, 'Kids\' Heavy Duty Winter Parka', 1245.00, 1, '2026-01-12 11:53:38', '2026-01-12 11:53:38'),
(65, 37, 33, 'Girls\' Classic Denim Jacket', 1430.00, 1, '2026-01-12 11:53:38', '2026-01-12 11:53:38'),
(66, 38, 34, 'Summer Yellow Floral Dress', 1450.00, 1, '2026-01-13 01:20:17', '2026-01-13 01:20:17'),
(67, 39, 40, 'Vibrant Mustard Winter Parka', 3400.00, 1, '2026-01-13 08:47:10', '2026-01-13 08:47:10'),
(68, 39, 33, 'Girls\' Classic Denim Jacket', 1430.00, 1, '2026-01-13 08:47:10', '2026-01-13 08:47:10'),
(69, 40, 40, 'Vibrant Mustard Winter Parka', 3400.00, 1, '2026-01-13 11:04:27', '2026-01-13 11:04:27'),
(70, 40, 33, 'Girls\' Classic Denim Jacket', 1430.00, 1, '2026-01-13 11:04:27', '2026-01-13 11:04:27'),
(71, 41, 40, 'Vibrant Mustard Winter Parka', 3400.00, 1, '2026-01-13 11:06:08', '2026-01-13 11:06:08'),
(72, 41, 33, 'Girls\' Classic Denim Jacket', 1430.00, 1, '2026-01-13 11:06:08', '2026-01-13 11:06:08'),
(73, 42, 33, 'Girls\' Classic Denim Jacket', 1430.00, 1, '2026-01-13 11:07:53', '2026-01-13 11:07:53'),
(74, 43, 33, 'Girls\' Classic Denim Jacket', 1430.00, 1, '2026-01-13 11:17:10', '2026-01-13 11:17:10'),
(75, 44, 34, 'Summer Yellow Floral Dress', 1450.00, 1, '2026-01-13 11:17:52', '2026-01-13 11:17:52'),
(76, 45, 22, 'Men\'s Navy Windowpane Blazer', 2300.00, 1, '2026-01-13 11:30:45', '2026-01-13 11:30:45'),
(77, 46, 33, 'Girls\' Classic Denim Jacket', 1430.00, 1, '2026-01-13 11:58:48', '2026-01-13 11:58:48');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `weight` decimal(8,2) DEFAULT NULL,
  `length` decimal(8,2) DEFAULT NULL,
  `width` decimal(8,2) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `quick_view` varchar(255) DEFAULT NULL,
  `short_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `brand`, `sku`, `color`, `weight`, `length`, `width`, `price`, `stock`, `description`, `image`, `created_at`, `updated_at`, `quick_view`, `short_description`) VALUES
(19, 10, 'HP Laptop for Digital Work and Study', 'hp-laptop-for-digital-work-and-study-f3Se', 'HP', 'ELE-25-GBLK', 'Silver', 1.50, 24.00, 44.00, 74900.00, 13, '⁜ Features of HP 15-fd0812TU Laptop In Bangladesh\r\nThe HP 15-fd0812TU is a reliable laptop for daily tasks and entertainment. It comes with an Intel Core 5 processor, 8GB of RAM, and a 512GB SSD. The 15.6-inch FHD display offers clear and vibrant visuals. Its silver design makes it look stylish and modern. This laptop is perfect for both work and casual use.\r\n\r\n⁜ Ultra-Smooth Speed\r\nThe HP 15-fd0812TU runs smoothly thanks to its Intel Core 5 processor and 8GB RAM. It can handle multiple tasks without lag. Whether you\'re working on documents or browsing the web, it delivers fast performance. The 512GB SSD also boosts its speed, making file transfers and boot-ups much quicker.\r\nCrystal-Clear QHD\r\n\r\n⁜ Enjoy clear visuals with the 15.6-inch Full HD screen. The HP 15-fd0812TU gives crisp and bright images. It is great for watching videos, browsing, or editing photos. Whether you\'re working or relaxing, the screen provides a great viewing experience. The high resolution makes every detail stand out.\r\nImmersive Design\r\n\r\n⁜ The HP 15-fd0812TU has a sleek, minimalistic design that fits any setting. Its silver color adds a premium feel. The lightweight build makes it portable, so you can easily carry it around. Whether you\'re at home, school, or work, the design is both functional and attractive.\r\nFlexible Comfort\r\n\r\n⁜ The keyboard is comfortable to type on for long hours. The laptop’s size is also perfect for multitasking. It doesn\'t feel too bulky and can fit in your bag easily. The HP 15-fd0812TU offers both style and comfort, making it an excellent choice for work or play.\r\nPremium Aesthetics\r\n\r\n⁜ The HP 15-fd0812TU offers a premium look with its silver finish. It has a clean and modern design that fits into any environment. Whether you\'re working or relaxing, this laptop adds a touch of class. Its elegant design complements its powerful performance.\r\nWhat to Consider Before Buying the HP 15-fd0812TU\r\n\r\n⁜ The HP 15-fd0812TU does not have dedicated graphics. This may limit its ability for heavy gaming or professional video editing. However, it is perfect for everyday tasks like web browsing, word processing, and light photo editing. If you need high-end graphics, you might want to look at other models. But for most users, this laptop delivers great performance.\r\nGet Your HP 15-fd0812TU Only from Ryans Computers Limited\r\n\r\n⁜ Buy the HP 15-fd0812TU Intel Core 5 15.6 Inch FHD Display Silver Laptop only from Ryans Computers Limited. Visitour outlet to check out the best prices and deals. Don\'t miss out—click \"Add to Cart\" now at Ryans Computers Limited.\r\nWhat is the price of HP 15-fd0812TU Laptop In Bangladesh?\r\n\r\n⁜ The price of HP 15-fd0812TU Laptop starts from 72,500 . The price may vary due to your customization and product availability. You can buy HP 15-fd0812TU Laptop from our website or visit our showrooms nearby.\r\nLooking to purchase office, corporate, or institutional equipment? Ryans Computers is here to help. We provide customized solutions tailored to your needs, backed by fast delivery and dependable after-sales service. Our expert Ryans Care team is always ready to support you with troubleshooting, technical assistance, and configuration services—so you can focus on what matters most.', 'products/q8QNGcO3VDVvjw54OKSXJIQ3H3xsr4uHnRu81YwJ.png', '2025-12-11 00:46:43', '2025-12-23 03:27:33', '⁜ Processor Type. - Core 5\r\n⁜ Generation - Core Series 1\r\n⁜ RAM - 8GB\r\n⁜ Storage - 512GB SSD\r\n⁜ Graphics Memory - Shared\r\n⁜ Display Size (Inch) - 15.6\r\n⁜ Color - Silver\r\n⁜ Weight 1.5', 'HP 15-fd0812TU Series 1 Intel Core 5 120U 8GB RAM, 512GB SSD 15.6 Inch FHD Display Silver Laptop'),
(21, 18, 'Chic Black Leather Barrel Bag', 'chic-black-leather-barrel-bag-4h7L', 'SURABIL', 'XXX-25-ODZT', 'Black', 0.60, 24.00, 24.00, 2850.00, 0, '👉 Product Overview\r\nElevate your everyday carry with this sophisticated Black Leather Barrel Handbag. Featuring a structured cylindrical shape and elegant silver-tone hardware, this bag blends classic style with modern functionality. The pebble-textured finish adds durability and a premium feel, making it the perfect accessory for both work and casual outings.\r\n\r\n✅ Key Features\r\n🔥Structured Design: The unique barrel shape maintains its form, keeping your belongings organized and accessible.\r\n🔥Dual Carry Options: Features sturdy top handles for a classic grip and D-rings to attach an optional shoulder strap.\r\n🔥Secure Hardware: Equipped with high-quality silver buckles and a smooth zipper closure to keep essentials safe.\r\n🔥Premium Texture: Crafted from high-grade pebbled faux leather that is resistant to scratches and easy to wipe clean.\r\n🔥Spacious Interior: Despite its compact look, the interior is roomy enough for a wallet, phone, keys, and makeup essentials.\r\n\r\n📜 Specifications\r\n♦️ Brand: Fashion Edit\r\n♦️ Material: Premium Pebbled Faux Leather\r\n♦️ Color: Black\r\n♦️ Closure: Zipper & Buckle Detailing', 'products/Zkub6ENbU98dQ59STcpPTjzolfOMCExClPA9l4nQ.png', '2025-12-14 04:16:38', '2025-12-28 03:33:09', '✔️Structured cylindrical shape\r\n✔️Premium pebbled texture\r\n✔️Silver-tone hardware buckle\r\n✔️Dual top carry handles\r\n✔️Spacious zipper compartment\r\n✔️Durable faux leather', 'Chic and structured barrel bag with silver accents for everyday elegance.'),
(22, 11, 'Men\'s Navy Windowpane Blazer', 'mens-navy-windowpane-blazer-RkjH', 'SARA', 'WIN-25-RLER', 'brown navy', 0.70, 44.00, 38.00, 2300.00, 7, 'My apologies for missing the Short Notes and the Quick Overview section in the previous response. Based on your specific template and the need for whitespace-pre-line formatting, here are the detailed details for the 10 products.\r\n\r\n1. Black Leather Barrel Handbag\r\nproduct name: Luxury Black Barrel Handbag\r\nprice: TK 2,850\r\nQuick Overview:\r\n✔️Structured cylindrical shape\r\n✔️Premium pebbled texture\r\n✔️Silver-tone hardware buckle\r\n✔️Dual top carry handles\r\n✔️Spacious zipper compartment\r\n✔️Durable faux leather\r\n\r\nShort Notes(max-15 words, appear below name of product in card):\r\nChic and structured barrel bag with silver accents for everyday elegance.\r\n\r\n👉 Product Overview\r\nElevate your everyday carry with this sophisticated Black Leather Barrel Handbag. Featuring a structured cylindrical shape and elegant silver-tone hardware, this bag blends classic style with modern functionality. The pebble-textured finish adds durability and a premium feel, making it the perfect accessory for both work and casual outings.\r\n\r\n✅ Key Features\r\n🔥Structured Design: The unique barrel shape maintains its form, keeping your belongings organized and accessible.\r\n🔥Dual Carry Options: Features sturdy top handles for a classic grip and D-rings to attach an optional shoulder strap.\r\n🔥Secure Hardware: Equipped with high-quality silver buckles and a smooth zipper closure to keep essentials safe.\r\n🔥Premium Texture: Crafted from high-grade pebbled faux leather that is resistant to scratches and easy to wipe clean.\r\n🔥Spacious Interior: Despite its compact look, the interior is roomy enough for a wallet, phone, keys, and makeup essentials.\r\n\r\n📜 Specifications\r\n♦️ Brand: Fashion Edit\r\n♦️ Material: Premium Pebbled Faux Leather\r\n♦️ Color: Black\r\n♦️ Closure: Zipper & Buckle Detailing\r\n\r\n2. Men\'s Navy Windowpane Blazer\r\nproduct name: Men\'s Navy Windowpane Blazer\r\nprice: TK 5,500\r\nQuick Overview:\r\n✔️Modern slim fit cut\r\n✔️Subtle windowpane check\r\n✔️Premium wool blend fabric\r\n✔️Breathable and comfortable\r\n✔️Classic notch lapel\r\n✔️Versatile smart-casual style\r\n\r\nShort Notes(max-15 words, appear below name of product in card):\r\nSharp navy jacket with subtle light blue checks for a polished look.\r\n\r\n👉 Product Overview\r\nMake a sharp impression with this Men\'s Navy Windowpane Plaid Blazer. Tailored for a modern fit, this jacket features a subtle yet distinct light blue check pattern over a deep navy base. Whether paired with dress trousers for a meeting or jeans for a night out, the textured fabric and notch lapel design ensure a polished look.\r\n\r\n✅ Key Features\r\n🔥Modern Tailoring: Cut for a slim, contemporary fit that accentuates the shoulders and waist.\r\n🔥Distinctive Pattern: A classic windowpane check adds visual interest without being overpowering.\r\n🔥Versatile Styling: Perfectly bridges the gap between formal business wear and smart-casual attire.\r\n🔥Quality Details: Features a classic notch lapel, two-button fastening, and a functional breast pocket.\r\n🔥Textured Fabric: The woven material offers breathability and wrinkle resistance for all-day comfort.\r\n\r\n📜 Specifications\r\n♦️ Brand: Gentleman\'s Choice\r\n♦️ Material: Wool Blend\r\n♦️ Color: Navy Blue with Light Blue Check\r\n♦️ Care Instructions: Dry Clean Only', 'products/LFDEzZ8qjfggIzMQpRlVRkMeEmDHqPeMN2EFk33F.png', '2025-12-14 04:19:44', '2026-01-13 11:30:45', '✔️Modern slim fit cut\r\n✔️Subtle windowpane check\r\n✔️Premium wool blend fabric\r\n✔️Breathable and comfortable\r\n✔️Classic notch lapel\r\n✔️Versatile smart-casual style', 'Sharp navy jacket with subtle light blue checks for a polished look.'),
(23, 14, 'Gold Frame Blue Lens Sunglasses', 'gold-frame-blue-lens-sunglasses-GjW6', 'Optima', 'SUN-25-TM0W', 'gold blue', 0.10, 12.00, 4.00, 2050.00, 2, '👉 Product Overview\r\nStep out in style with these retro-inspired Gold Frame Blue Lens Sunglasses. Combining the classic aviator silhouette with a modern geometric edge, these shades feature a sleek double bridge and vibrant blue tinted lenses. They provide essential eye protection while serving as a bold fashion statement for sunny days.\r\n\r\n✅ Key Features\r\n🔥UV Protection: High-quality lenses block harmful UVA and UVB rays to protect your eyes.\r\n🔥Stylish Design: A hybrid of aviator and square shapes with a sophisticated gold-tone metal frame.\r\n🔥Comfort Fit: Adjustable silicone nose pads and acetate temple tips ensure a secure, comfortable fit.\r\n🔥Lightweight Build: The thin metal construction is durable yet light enough for all-day wear.\r\n🔥Vibrant Tint: Blue lenses reduce glare and improve color perception in bright conditions.\r\n\r\n📜 Specifications\r\n♦️ Brand: SunStyle\r\n♦️ Material: Metal Alloy / Polycarbonate Lens\r\n♦️ Color: Gold Frame / Blue Lens\r\n♦️ Lens Type: Non-Polarized UV400', 'products/xMiJvZMLBb9ks2QwvdAnmAQIwrHDCscLt92mrOgl.png', '2025-12-14 04:21:38', '2026-01-10 23:03:29', '✔️Vibrant blue tinted lenses\r\n✔️Sleek gold-tone metal frame\r\n✔️Modern geometric aviator shape\r\n✔️UV400 eye protection\r\n✔️Lightweight and comfortable\r\n✔️Adjustable silicone nose pads', 'Vintage-inspired gold frames with cool blue lenses for a bold statement.'),
(24, 11, 'Copper Lightweight Bomber Jacket', 'copper-lightweight-bomber-jacket-xv9o', 'PUMA', 'WIN-25-WPOY', 'coper', 1.20, 56.00, 33.00, 2450.00, 2, '👉 Product Overview\r\nAdd a layer of effortless cool with this Copper Lightweight Bomber Jacket. Designed for transitional weather, this jacket features a smooth, shimmering finish and classic ribbed trims. Its lightweight construction makes it easy to pack, while the iconic sleeve pocket detail adds a touch of utilitarian flair to your streetwear wardrobe.\r\n\r\n✅ Key Features\r\n🔥Classic Bomber Fit: Features the iconic ribbed collar, cuffs, and hem for a snug, athletic silhouette.\r\n🔥Utility Pocket: Includes a zippered sleeve pocket for storing small essentials like keys or cards.\r\n🔥Lightweight Fabric: Made from smooth, wind-resistant material that is perfect for layering.\r\n🔥Smooth Zipper: Durable metal front zipper allows for easy on-and-off and adjustable ventilation.\r\n🔥Versatile Color: The unique copper-brown shade pairs excellently with denim and neutral tones.\r\n\r\n📜 Specifications\r\n♦️ Brand: Urban Wear\r\n♦️ Material: 100% Polyester / Nylon Blend\r\n♦️ Color: Copper Brown\r\n♦️ Care Instructions: Machine Wash Cold', 'products/5YBRUOuOUlCqg7OpFkSZsg7UPHalkQnu9gL3Pbx6.png', '2025-12-14 04:24:28', '2025-12-22 02:41:29', '✔️Unique copper metallic finish\r\n✔️Classic ribbed collar and cuffs\r\n✔️Zippered utility sleeve pocket\r\n✔️Wind-resistant smooth fabric\r\n✔️Lightweight for layering\r\n✔️Durable front metal zipper', 'Trendy metallic copper jacket perfect for layering in mild transitional weather.'),
(25, 4, 'Canon EOS DSLR Camera', 'canon-eos-dslr-camera-naHD', 'Canon', 'GAD-25-1YKS', 'Black', 0.50, 24.00, 6.00, 42000.00, 1, '👉 Product Overview\r\nCapture life\'s moments in stunning detail with this Canon EOS DSLR Camera, paired with a prime 50mm lens. Perfect for photography enthusiasts, this camera offers superior image quality, depth of field control, and ergonomic handling. The included \"nifty fifty\" lens is ideal for portraits, creating beautiful background blur and sharp subjects.\r\n\r\n✅ Key Features\r\n🔥High-Resolution Sensor: Captures detailed images with vibrant colors and low noise, even in low light.\r\n🔥Prime Lens Included: Comes with a 50mm f/1.8 lens, perfect for portraits and low-light photography.\r\n🔥Full HD Video: Records 1080p video, making it great for vlogging and content creation.\r\n🔥Optical Viewfinder: Provides a clear, real-time view of your subject for precise composition.\r\n🔥User-Friendly Interface: Intuitive controls and menu system make it accessible for beginners and pros alike.\r\n\r\n📜 Specifications\r\n♦️ Brand: Canon\r\n♦️ Model: EOS Series (Rebel)\r\n♦️ Lens: EF 50mm f/1.8\r\n♦️ Color: Black', 'products/u0cILLB8PmFt8Wu8zKa1x3vY5MyfVFx4hhDYMv0F.png', '2025-12-14 04:32:37', '2025-12-14 06:50:58', '✔️Includes 50mm f/1.8 prime lens\r\n✔️High-resolution image sensor\r\n✔️Full HD video recording\r\n✔️Ergonomic grip design\r\n✔️Optical viewfinder\r\n✔️Great for low-light photography', 'Professional entry-level DSLR with a 50mm lens for stunning portrait photography.'),
(26, 5, 'Classic Rainbow Umbrella', 'classic-rainbow-umbrella-dw0s', 'SURABIL', 'STA-25-ITRQ', 'Rainbow', 0.30, NULL, NULL, 850.00, 17, '👉 Product Overview\r\nBrighten up the gloomiest rainy days with this Classic Rainbow Umbrella. Featuring a vibrant multi-colored canopy, this umbrella isn\'t just a weather shield—it\'s a mood booster. With a sturdy metal shaft and a classic curved wooden handle, it offers reliable protection against rain and wind while looking timelessly stylish.\r\n\r\n✅ Key Features\r\n🔥Vibrant Canopy: 16-panel design featuring a spectrum of bright colors to stand out in the rain.\r\n🔥Sturdy Construction: Built with a strong metal shaft and flexible ribs to withstand gusty winds.\r\n🔥Ergonomic Handle: The classic J-shaped wooden handle provides a comfortable and secure grip.\r\n🔥Large Coverage: Wide diameter canopy ensures you stay dry from head to toe.\r\n🔥Easy Mechanism: Smooth manual opening mechanism that is durable and reliable.\r\n\r\n📜 Specifications\r\n♦️ Brand: RainGuard\r\n♦️ Material: Waterproof Nylon / Wood / Metal\r\n♦️ Color: Multicolor Rainbow\r\n♦️ Type: Stick Umbrella', 'products/R8OipU8u8X0NBax5DRHONyRuDkQ9ktg8tQrcEDwZ.png', '2025-12-14 04:34:33', '2025-12-28 07:17:14', '✔️Heavy-duty 16-rib structure\r\n✔️Vibrant multicolor canopy\r\n✔️Classic J-shaped wooden handle\r\n✔️Large coverage area\r\n✔️Windproof design\r\n✔️Smooth manual opening', 'Sturdy and colorful umbrella with 16 ribs to brighten up rainy days.'),
(27, 4, 'Two-Tone Luxury Dive Watch', 'two-tone-luxury-dive-watch-3kKK', 'Rolex', 'GAD-25-LEK8', 'gold and silver timepiece', 0.14, NULL, NULL, 2500005.00, 4, '👉 Product Overview\r\nCommand attention with this exquisite Two-Tone Luxury Dive Watch. Inspired by classic horology, this timepiece features a striking combination of stainless steel and gold tones, complemented by a bold black dial. Whether you are at a business dinner or underwater, the robust construction and elegant design ensure you are always on time and in style.\r\n\r\n✅ Key Features\r\n🔥Precision Movement: Powered by a reliable automatic mechanical movement for accurate timekeeping.\r\n🔥Rotating Bezel: Features a unidirectional rotating bezel with gold markings for tracking elapsed time.\r\n🔥Luminous Display: Hands and hour markers glow in the dark for visibility in low-light conditions.\r\n🔥Date Window: Includes a magnified date cyclops at the 3 o\'clock position for easy reading.\r\n🔥Durable Build: Stainless steel bracelet with a secure clasp ensures longevity and wear resistance.\r\n\r\n📜 Specifications\r\n♦️ Brand: LuxTime\r\n♦️ Material: Stainless Steel / Gold Plating\r\n♦️ Color: Silver & Gold / Black Dial\r\n♦️ Water Resistance: Yes', 'products/nam2ynJJtWh6TzKXPP7oS5oK6wSH0zAV4OtJgZ8h.png', '2025-12-14 04:36:42', '2025-12-14 04:36:42', '✔️Stainless steel gold & silver\r\n✔️Rotating dive bezel\r\n✔️Luminous hands and markers\r\n✔️Date window with cyclops\r\n✔️Automatic mechanical movement\r\n✔️Water-resistant construction', 'Elegant gold and silver timepiece suitable for both business and underwater adventures.'),
(28, 16, 'Men\'s Forest Green Textured Suit', 'mens-forest-green-textured-suit-a4TN', 'Kings Man', 'MEN-25-2XSF', 'deep green textured', 0.50, 56.00, 44.00, 3400.00, 4, '👉 Product Overview\r\nRedefine formal wear with this Men\'s Forest Green Textured Suit. Moving away from standard blacks and blues, this suit offers a rich, deep green hue in a premium textured fabric. Ideally suited for fall weddings, winter galas, or creative office environments, it projects confidence and sophisticated taste.\r\n\r\n✅ Key Features\r\n🔥Rich Texture: The fabric features a subtle weave that adds depth and character to the deep green color.\r\n🔥Tailored Fit: Designed to contour the body for a sharp, modern silhouette.\r\n🔥Complete Look: Pairs perfectly with a crisp shirt and textured tie for a cohesive ensemble.\r\n🔥Premium Feel: The material feels substantial yet soft, offering warmth and comfort.\r\n🔥Attention to Detail: Finished with high-quality buttons and precise stitching on the lapels and pockets.\r\n\r\n📜 Specifications\r\n♦️ Brand: Sartorial Green\r\n♦️ Material: Tweed / Wool Blend\r\n♦️ Color: Forest Green\r\n♦️ Fit: Slim / Modern Fit', 'products/kv70T1sV95Rrm9KGuizSiYnLSxChFZjH8S97y9SH.png', '2025-12-14 04:38:32', '2025-12-14 04:38:32', '✔️Unique forest green color\r\n✔️Rich textured wool fabric\r\n✔️Slim modern fit\r\n✔️Notch lapel design\r\n✔️Two-button front closure\r\n✔️Perfect for autumn/winter', 'A deep green textured suit that offers a distinguished and modern formal look.'),
(29, 9, 'Blue Hydration Skincare Set', 'blue-hydration-skincare-set-wIY1', 'Himalaya', 'SKI-25-KZCN', 'purple bottle', 1.30, 45.00, 23.00, 3400.00, 22, '👉 Product Overview\r\nRevitalize your skin with this luxury Blue Hydration Skincare Set. Packaged in stunning metallic blue bottles, this trio includes everything needed for a complete regimen: a refreshing toner/cleanser, a potent serum, and a rich moisturizing cream. Formulated to hydrate and rejuvenate, this set looks as beautiful on your vanity as it feels on your skin.\r\n\r\n✅ Key Features\r\n🔥Complete Regimen: A 3-piece set targeting cleansing, treatment, and moisturization.\r\n🔥Elegant Packaging: The gradient metallic blue glass containers preserve product integrity and look luxurious.\r\n🔥Hydration Focus: Formulated to lock in moisture, leaving skin plump and glowing.\r\n🔥Anti-Aging Properties: The serum and cream work together to reduce fine lines and improve texture.\r\n🔥Universal Use: Suitable for various skin types, providing balanced care day and night.\r\n\r\n📜 Specifications\r\n♦️ Brand: BRAND Cosmetics\r\n♦️ Contents: Pump Bottle, Dropper Serum, Cream Jar\r\n♦️ Main Benefit: Hydration & Anti-Aging\r\n♦️ Packaging: Metallic Blue / Silver', 'products/3RbFxm3Ll2hHF5HWoN2Guo2sGxI503HdH6VBJAFJ.png', '2025-12-14 04:40:32', '2025-12-14 07:19:18', '✔️3-piece full skincare set\r\n✔️Includes toner, serum, cream\r\n✔️Deep hydration formula\r\n✔️Anti-aging properties\r\n✔️Luxury glass packaging\r\n✔️Suitable for all skin types', 'Complete anti-aging set with toner, serum, and moisturizer for glowing skin.'),
(30, 10, 'HP 15\" Black Laptop', 'hp-15-black-laptop-T68V', 'HP', 'ELE-25-FHKE', 'Silver', 1.40, 28.00, 20.00, 65000.00, 10, '👉 Product Overview\r\nStay productive and entertained with the reliable HP 15\" Black Laptop. Built for daily tasks, this laptop features a textured chassis that resists fingerprints and a full-sized keyboard for comfortable typing. Whether you are working on spreadsheets, streaming media, or attending video calls, this device offers the performance you need in a durable package.\r\n\r\n✅ Key Features\r\n🔥Textured Finish: The unique diamond-pattern texture provides grip and keeps the laptop looking clean.\r\n🔥Full Keyboard: Includes a dedicated number pad, making data entry and calculations a breeze.\r\n🔥Clear Display: The 15.6-inch screen offers ample space for multitasking and media consumption.\r\n🔥Portability: Slim profile and reasonable weight make it easy to carry in a backpack or bag.\r\n🔥Connectivity: Equipped with essential ports including USB, HDMI, and an SD card reader.\r\n\r\n📜 Specifications\r\n♦️ Brand: HP\r\n♦️ Color: Black\r\n♦️ Screen Size: 15.6 Inches\r\n♦️ OS: Windows 10/11 Home', 'products/HetlBIULbfPOAPKd2jPI1NCtKns5DWgn4cZ5L3Ve.png', '2025-12-14 04:42:38', '2025-12-14 04:42:38', '✔️15.6-inch clear display\r\n✔️Full-sized keyboard with numpad\r\n✔️Textured fingerprint-resistant body\r\n✔️Lightweight and portable\r\n✔️Multiple USB & HDMI ports\r\n✔️Durable everyday performance', 'Reliable everyday laptop with a textured finish and full keyboard for productivity.'),
(31, 13, 'Boys\' Green Overshirt & Chino Set', 'boys-green-overshirt-chino-set-PnR9', NULL, 'KID-25-KN97', NULL, NULL, NULL, NULL, 1850.00, 8, '👉 Product Overview\r\nGet your little skater ready for the park with this Boys\' Green Overshirt & Chino Set. Featuring a rugged olive green button-down shirt that looks great open over a tee or buttoned up, paired with durable brown trousers. It’s a versatile look that balances cool street style with all-day comfort.\r\n\r\n✅ Key Features\r\n🔥Versatile Layering: The shirt works perfectly as a light jacket or a standalone top.\r\n🔥Durable Fabric: Made from tough cotton blends designed to withstand playground wear and tear.\r\n🔥Easy Movement: Relaxed fit trousers ensure he can skate, run, and jump without restriction.\r\n🔥Neutral Tones: Earthy green and brown colors are easy to match with other wardrobe staples.\r\n🔥Classic Style: A timeless look that transitions easily from school to weekend activities.\r\n🔥Machine Washable: Easy care fabric that holds up well after repeated washing.\r\n\r\n📜 Specifications\r\n♦️ Material: Cotton / Polyester Blend\r\n♦️ Color: Olive Green & Brown\r\n♦️ Includes: Shirt and Pants\r\n♦️ Style: Casual / Streetwear', 'products/ZLUmXUQWFpF33RMfxWPNRgeoXmi8E5Pm7ECrvoBx.png', '2025-12-27 02:41:41', '2026-01-05 00:45:44', '✔️Casual olive green button-up\r\n✔️Comfortable brown chino pants\r\n✔️Great for active play\r\n✔️Layerable over t-shirts\r\n✔️Durable cotton fabric\r\n✔️Relaxed fit for movement', 'A stylish and durable casual outfit perfect for active boys on the go'),
(32, 13, 'Girls\' Mustard Knit Sweater & Beanie', 'girls-mustard-knit-sweater-beanie-INPn', NULL, 'KID-25-KDOY', NULL, NULL, NULL, NULL, 2000.00, 3, '👉 Product Overview\r\nBrighten up cold days with this adorable Girls\' Mustard Knit Sweater & Beanie combo. The vibrant yellow pullover offers warmth without the bulk, while the soft grey beanie adds a cute, hipster touch. Ideally suited for fall breezes or winter layering, this set keeps your little one cozy and fashionable.\r\n\r\n✅ Key Features\r\n🔥Soft Knit: Crafted from gentle yarn that feels soft against sensitive skin.\r\n🔥Warm Accessories: Comes with a stylish knitted beanie to keep ears warm.\r\n🔥Vibrant Color: The mustard yellow shade adds a pop of sunshine to grey winter days.\r\n🔥Comfort Fit: Ribbed cuffs and hem keep the sweater in place during play.\r\n🔥Versatile Pairing: Looks great with jeans, skirts, or leggings.\r\n🔥Breathable Warmth: Provides insulation while allowing skin to breathe.\r\n\r\n📜 Specifications\r\n♦️ Material: Acrylic / Wool Blend\r\n♦️ Color: Mustard Yellow\r\n♦️ Includes: Sweater and Hat\r\n♦️ Care: Hand Wash Recommended', 'products/CYJUmrMwdbD48fGgUmpbEPZ2kciA0B89IbxnM4pd.png', '2025-12-27 02:43:28', '2026-01-10 23:03:29', '✔️Cozy mustard yellow knit\r\n✔️Matching grey beanie hat\r\n✔️Soft, non-itchy fabric\r\n✔️Ribbed cuffs and hem\r\n✔️Perfect for chilly days\r\n✔️Bright and cheerful color', 'A cozy mustard sweater and beanie combo to keep her warm and smiling.'),
(33, 13, 'Girls\' Classic Denim Jacket', 'girls-classic-denim-jacket-UhAO', NULL, 'KID-25-HHBG', 'denim', NULL, NULL, NULL, 1430.00, 2, '👉 Product Overview\r\nEvery closet needs a staple, and this Girls\' Classic Denim Jacket is just that. With a medium blue wash and sturdy metal buttons, it adds a layer of cool to any dress or casual outfit. Designed with a hint of stretch, it allows for freedom of movement while maintaining that structured denim look.\r\n\r\n✅ Key Features\r\n🔥Timeless Design: A classic cut that never goes out of style and works year-round.\r\n🔥Functional Pockets: Features two buttoned chest pockets for small treasures.\r\n🔥Stretch Denim: Softened denim fabric ensures she can move her arms freely.\r\n🔥Easy Buttons: Metal shank buttons are durable and easy for little fingers to use.\r\n🔥Layering Hero: Perfect for throwing over a summer dress or a winter hoodie.\r\n🔥Rugged Build: Strong stitching stands up to rough-and-tumble play.\r\n\r\n📜 Specifications\r\n♦️ Material: Cotton Denim with Spandex\r\n♦️ Color: Medium Blue Wash\r\n♦️ Closure: Button Front\r\n♦️ Sleeve: Long Sleeve', 'products/lB25ro4FR83xx7s6RZwV6t1DMMmgI7q80hTwovmx.png', '2025-12-27 02:44:55', '2026-01-13 11:58:48', '✔️Timeless blue denim wash\r\n✔️Button-down front closure\r\n✔️Two chest pockets\r\n✔️Durable stitching\r\n✔️Stretchy comfortable fit\r\n✔️Essential layering piece', 'The ultimate wardrobe staple, a classic denim jacket that goes with everything.'),
(34, 13, 'Summer Yellow Floral Dress', 'summer-yellow-floral-dress-NBvk', NULL, 'KID-25-SW6X', 'Yellow', NULL, NULL, NULL, 1450.00, 2, '👉 Product Overview\r\nCapture the spirit of summer with this Summer Yellow Floral Dress. The cheerful yellow fabric is scattered with a delicate white pattern, making it perfect for picnics, parties, or just playing in the garden. Its lightweight construction ensures she stays cool even on the hottest days.\r\n\r\n✅ Key Features\r\n🔥Sunny Aesthetic: The bright yellow color captures the joy and energy of childhood.\r\n🔥Breathable Fabric: Made from light materials to prevent overheating.\r\n🔥Comfortable Fit: The relaxed A-line silhouette allows for plenty of twirling.\r\n🔥Versatile Wear: Dress it up with sandals or keep it casual with sneakers.\r\n🔥Soft Texture: Gentle on the skin for all-day wearability.\r\n🔥Easy Care: Wrinkle-resistant fabric makes laundry day a breeze.\r\n\r\n📜 Specifications\r\n♦️ Material: Cotton / Viscose Blend\r\n♦️ Color: Yellow with White Print\r\n♦️ Pattern: Floral / Abstract\r\n♦️ Season: Spring / Summer', 'products/DeYWICIFCBTZaE47cBGkO1Q3HIgR9F1KVMK8GJZq.png', '2025-12-27 02:46:43', '2026-01-13 11:17:52', '✔️Bright yellow floral print\r\n✔️Lightweight breathable fabric\r\n✔️Comfortable A-line cut\r\n✔️Short sleeves for summer\r\n✔️Soft and flowy feel\r\n✔️Great for parties or play', 'A sunny and playful yellow dress featuring a charming floral print for summer fun.'),
(35, 13, 'Little Fashionista Striped Dress', 'little-fashionista-striped-dress-SjeF', NULL, 'KID-25-0DBI', NULL, NULL, NULL, NULL, 1230.00, 17, '👉 Product Overview\r\nLet her personality shine with this Little Fashionista Striped Dress. Featuring bold, colorful horizontal stripes in navy, red, and white, this dress creates a nautical yet modern look. It\'s the perfect outfit for a day of \"shopping,\" a beach trip, or a stylish family brunch.\r\n\r\n✅ Key Features\r\n🔥Bold Stripes: Eye-catching horizontal color blocks create a fun, stylish look.\r\n🔥Jersey Comfort: Made from soft, t-shirt like material for maximum comfort.\r\n🔥Sleeveless Cut: Keeps her cool and allows for easy layering with cardigans.\r\n🔥Defined Waist: Features a subtle gather at the waist for a cute silhouette.\r\n🔥Durable Prints: Colors stay vibrant even after multiple washes.\r\n🔥Playful Vibe: Ideally suited for accessories like sunglasses and sun hats.\r\n\r\n📜 Specifications\r\n♦️ Material: 100% Cotton Jersey\r\n♦️ Color: Navy, Red, White Stripes\r\n♦️ Style: Sleeveless Sundress\r\n♦️ Length: Knee-Length', 'products/SldaWQec1CgwkvkDMJLJtKQYfWeyGAuUFOSa2KsY.png', '2025-12-27 02:48:10', '2026-01-05 05:49:46', '✔️Bold horizontal stripes\r\n✔️Sleeveless summer design\r\n✔️Cinched waist detail\r\n✔️Colorful and trendy\r\n✔️Soft jersey cotton feel\r\n✔️Perfect for vacation', 'A chic multicolored striped dress for the little fashionista who loves to stand out.'),
(36, 13, 'Boys\' Red & Blue Plaid Flannel', 'boys-red-blue-plaid-flannel-Pve4', NULL, 'KID-25-U9SK', NULL, NULL, NULL, NULL, 1234.00, 3, '👉 Product Overview\r\nDress him up or down with this versatile Boys\' Red & Blue Plaid Flannel. The classic tartan pattern offers a preppy yet rugged look suitable for school pictures or backyard adventures. Wear it fully buttoned for a smart appearance or open over a white tee for a relaxed vibe.\r\n\r\n✅ Key Features\r\n🔥Classic Plaid: A timeless red, blue, and white pattern that never fades from style.\r\n🔥Soft Touch: Brushed fabric feels cozy and warm against the skin.\r\n🔥Versatile Styling: Works as a standalone shirt or an open overshirt.\r\n🔥Durable Buttons: Securely attached buttons withstand active use.\r\n🔥Breathable Cotton: Keeps him comfortable throughout the school day.\r\n🔥Easy Ironing: Fabric resists deep creases for a neat look with minimal effort.\r\n\r\n📜 Specifications\r\n♦️ Material: Cotton Flannel\r\n♦️ Color: Red, Blue, White Plaid\r\n♦️ Closure: Button\r\n♦️ Fit: Regular', 'products/RsGpEMNkViLv9VgaBiCsxMlsEGaWbTk3TfzPF5FH.png', '2025-12-27 02:49:45', '2025-12-27 03:08:40', '✔️Classic tartan plaid pattern\r\n✔️Soft brushed flannel fabric\r\n✔️Button-down front\r\n✔️Chest pocket detail\r\n✔️Roll-up sleeve option\r\n✔️Smart-casual versatility', 'A smart and comfortable plaid flannel shirt that looks great with jeans.'),
(37, 13, 'Kids\' Heavy Duty Winter Parka', 'kids-heavy-duty-winter-parka-OZT2', NULL, 'KID-25-V3YW', NULL, NULL, NULL, NULL, 1245.00, 29, '👉 Product Overview\r\nPrepare for the chill with this Kids\' Heavy Duty Winter Parka. Designed with a streetwear edge, this coat features a robust caramel-colored exterior and thick insulation to battle the cold. With ample pockets for storing gloves and gadgets, it’s the ultimate jacket for urban explorers.\r\n\r\n✅ Key Features\r\n🔥Superior Warmth: Thick padding traps heat to keep your child warm in freezing temps.\r\n🔥Wind Resistant: The tightly woven outer shell blocks cutting winds.\r\n🔥Cargo Storage: Large front pockets provide plenty of room for essentials.\r\n🔥Protective Hood: A generous hood offers added shelter from rain and snow.\r\n🔥Trendsetting Style: The oversized, utilitarian look is right on trend.\r\n🔥Rugged Zippers: Heavy-duty zippers ensure smooth operation and durability.\r\n\r\n📜 Specifications\r\n♦️ Material: Polyester Shell / Synthetic Fill\r\n♦️ Color: Caramel / Tan\r\n♦️ Style: Winter Parka\r\n♦️ Pockets: Multiple Cargo Pockets', 'products/OzMhfHxmPB2CfIvrg88QIaKGR2y6BT7ALz2M4eBp.png', '2025-12-27 02:51:39', '2026-01-12 11:53:38', '✔️Thick insulated lining\r\n✔️Durable windproof exterior\r\n✔️Hooded for extra protection\r\n✔️Large cargo pockets\r\n✔️Stylish caramel brown color\r\n✔️Streetwear inspired design', 'A rugged and stylish winter parka designed to keep kids warm in harsh weather.'),
(38, 13, 'Girls\' Red Buffalo Check Shirt', 'girls-red-buffalo-check-shirt-SHc5', NULL, 'KID-25-HQXU', NULL, NULL, NULL, NULL, 1135.00, 22, '👉 Product Overview\r\nEmbrace the cozy vibes of fall with this Girls\' Red Buffalo Check Shirt. The bold red and black plaid pattern is a rustic classic, perfect for pumpkin patches, camping trips, or just a cozy day at home. Made from soft fabric, it feels like a warm hug on a cool day.\r\n\r\n✅ Key Features\r\n🔥Buffalo Plaid: The bold red and black check is a high-contrast fashion statement.\r\n🔥Cozy Feel: Soft texture ensures she stays warm and comfortable.\r\n🔥Layer Friendly: Roomy enough to wear over a thermal or t-shirt.\r\n🔥Durable Fabric: Stands up to outdoor play and frequent washing.\r\n🔥Adjustable Cuffs: Button cuffs allow sleeves to be rolled up or down.\r\n🔥Seasonal Favorite: The ultimate shirt for the fall and winter seasons.\r\n\r\n📜 Specifications\r\n♦️ Material: Cotton Blend Flannel\r\n♦️ Color: Red & Black Plaid\r\n♦️ Pattern: Buffalo Check\r\n♦️ Neckline: Collared', 'products/0OXREg7002RwfoLlQs02SPCLLot1Qzqf1CP1GS9B.png', '2025-12-27 02:53:02', '2025-12-27 03:08:40', '✔️Iconic red buffalo check\r\n✔️Soft and cozy flannel\r\n✔️Long sleeves with cuffs\r\n✔️Relaxed comfortable fit\r\n✔️Perfect for autumn\r\n✔️Easy button fastening', 'A cozy red and black plaid shirt perfect for autumn days and outdoor fun.'),
(39, 11, 'Women\'s Long Grey Puffer Coat', 'womens-long-grey-puffer-coat-I2NF', NULL, 'WIN-25-QLOJ', NULL, NULL, NULL, NULL, 2600.00, 3, '👉 Product Overview\r\nBrave the cold in style with this Women\'s Long Grey Puffer Coat. Designed for those who refuse to sacrifice fashion for warmth, this coat features a flattering long cut that protects you from the knees up. The luxurious faux fur trim on the hood adds a touch of elegance while shielding your face from biting winds.\r\n\r\n✅ Key Features\r\n🔥Extended Coverage: The knee-length design offers superior protection against cold drafts.\r\n🔥Luxurious Hood: Features a detachable faux fur trim that is soft, fluffy, and functional.\r\n🔥Thermal Lock: High-quality padding traps body heat to keep you warm in freezing temperatures.\r\n🔥Durable Fabric: The heather grey outer shell is tough against wear and resists light moisture.\r\n🔥Comfort Cuffs: Ribbed knit cuffs inside the sleeves prevent cold air from sneaking in.\r\n🔥Versatile Style: The neutral grey tone pairs effortlessly with any winter outfit, from jeans to dresses.\r\n\r\n📜 Specifications\r\n♦️ Material: Polyester / Synthetic Fill\r\n♦️ Color: Heather Grey\r\n♦️ Feature: Faux Fur Hood\r\n♦️ Length: Knee-Length', 'products/KESvc03UC0LQK7EmEZGzZJwIrTB1JOudAeZjMYHB.png', '2025-12-28 23:35:41', '2026-01-05 00:45:44', '✔️Elegant long-line silhouette\r\n✔️Plush faux fur hood trim\r\n✔️Quilted thermal insulation\r\n✔️Wind-resistant outer shell\r\n✔️Secure zip and button closure\r\n✔️Deep side pockets', 'A stylish long grey coat with a cozy fur hood for ultimate winter warmth.'),
(40, 11, 'Vibrant Mustard Winter Parka', 'vibrant-mustard-winter-parka-8VsT', NULL, 'WIN-25-KLSV', NULL, NULL, NULL, NULL, 3400.00, 0, '👉 Product Overview\r\nBring some sunshine to the snow with this Vibrant Mustard Winter Parka. This jacket is all about energy and comfort, featuring a bold color that stands out in a crowd. With a relaxed fit that allows for easy layering over sweaters, it\'s the perfect companion for casual winter outings and weekend adventures.\r\n\r\n✅ Key Features\r\n🔥High Visibility: The bright mustard-orange hue is a trendy and safe choice for dark winter days.\r\n🔥Weather Ready: Equipped with a spacious hood to keep your head dry during sudden drizzles.\r\n🔥Layer Friendly: The loose, comfortable cut ensures you don\'t feel restricted, even with heavy knits underneath.\r\n🔥Secure Closure: Features a zipper combined with a snap-button flap to seal out the wind.\r\n🔥Functional Design: Large pockets provide ample space to warm your hands or store your phone.\r\n🔥Soft Lining: The interior is lined with soft fabric for an extra cozy feel against the body.\r\n\r\n📜 Specifications\r\n♦️ Material: Cotton / Nylon Blend\r\n♦️ Color: Mustard Orange\r\n♦️ Style: Casual Parka\r\n♦️ Fit: Relaxed / Oversized', 'products/hQZdIdh0KyO8VAKtHQsBxobaLJXG3YMqHP24jgyY.png', '2025-12-28 23:36:54', '2026-01-13 11:06:08', '✔️Cheerful mustard orange color\r\n✔️Relaxed and comfortable fit\r\n✔️Attached hood for rain protection\r\n✔️Casual everyday style\r\n✔️Warm inner lining\r\n✔️Durable snap-button placke', 'A cheerful and vibrant mustard parka to brighten up cold and gloomy winter days'),
(41, 11, 'Luxury Mauve Faux Fur Coat', 'luxury-mauve-faux-fur-coat-BTLd', NULL, 'WIN-25-T3FD', NULL, NULL, NULL, NULL, 4200.00, 4, '👉 Product Overview\r\nWrap yourself in luxury with this exquisite Luxury Mauve Faux Fur Coat. Crafted from ultra-soft, dense faux fur arranged in horizontal panels, this coat mimics the look and feel of real fur without the cruelty. The matching belt clinches the waist, creating a stunning hourglass silhouette that is perfect for evening wear or upscale events.\r\n\r\n✅ Key Features\r\n🔥Ultra-Plush Texture: The high-quality faux fur feels incredibly soft and provides substantial warmth.\r\n🔥Defined Silhouette: Unlike bulky fur coats, the waist belt allows you to flatter your figure.\r\n🔥Chic High Neck: The collar stands up to protect your neck and adds a regal touch to the look.\r\n🔥Elegant Color: The dusty mauve pink is a unique, feminine alternative to standard black or brown coats.\r\n🔥Smooth Lining: Lined with silky satin that glides over your clothes for easy wear.\r\n🔥Hidden Pockets: subtly placed side pockets keep your hands warm without ruining the coat\'s lines.\r\n\r\n📜 Specifications\r\n♦️ Material: Premium Faux Fur\r\n♦️ Color: Dusty Mauve / Pink\r\n♦️ Closure: Hook & Eye / Belt\r\n♦️ Style: Belted Fur Coat', 'products/575ZQKalMFqZZ3AnZyBL9rtEUenZYy6EPuJfJW33.png', '2025-12-28 23:38:07', '2025-12-28 23:38:07', '✔️Premium plush faux fur\r\n✔️Elegant horizontal panel design\r\n✔️Matching waist tie belt\r\n✔️Sophisticated high collar\r\n✔️Soft mauve/pink shade\r\n✔️Satin inner lining', 'An elegant mauve faux fur coat with a belt for a sophisticated, high-end winter look.'),
(42, 11, 'Men\'s Heavy Duty Black Parka', 'mens-heavy-duty-black-parka-qTP7', NULL, 'WIN-25-GDKH', NULL, NULL, NULL, NULL, 4800.00, 24, '👉 Product Overview\r\nDominate the winter streets with the Men\'s Heavy Duty Black Parka. This coat is built for function and fashion, offering a streamlined, modern look that fits perfectly over a suit or casual wear. The long length ensures your legs stay warm, while the matte black finish gives it a stealthy, sophisticated vibe suitable for the city.\r\n\r\n✅ Key Features\r\n🔥Maximum Warmth: The long cut and thick insulation provide a shield against the harshest cold.\r\n🔥Urban Design: The minimalist matte black aesthetic works for both business commutes and casual nights.\r\n🔥Storm Protection: High collar acts as a scarf, blocking wind from your neck and face.\r\n🔥Water Repellent: The outer fabric sheds light rain and snow, keeping the insulation dry.\r\n🔥Mobility: Despite its length, the cut allows for comfortable walking and movement.\r\n🔥Secure Storage: Features deep inner and outer pockets to secure your wallet and keys.\r\n\r\n📜 Specifications\r\n♦️ Material: Polyester Shell / Synthetic Down\r\n♦️ Color: Matte Black\r\n♦️ Length: Long (Thigh/Knee)\r\n♦️ Fit: Regular / Slim', 'products/JPz1uqBhZAeG7HIgpwDQBJUiDHZPkwbMvGwptTgd.png', '2025-12-28 23:39:57', '2025-12-28 23:39:57', '✔️Sleek all-black design\r\n✔️Full-length cold protection\r\n✔️High-loft insulation\r\n✔️Windproof high collar\r\n✔️Modern streamlined fit\r\n✔️Water-repellent exterior', 'A sleek and robust black parka offering maximum protection and style for harsh winters.'),
(43, 11, 'Women\'s Cropped Blue Puffer', 'womens-cropped-blue-puffer-5It2', NULL, 'WIN-25-MU3W', NULL, NULL, NULL, NULL, 2900.00, 32, '👉 Product Overview\r\nAdd a pop of color to your wardrobe with this Women\'s Cropped Blue Puffer. This jacket hits the sweet spot between sporty and chic, featuring a bold royal blue color and a trendy cropped silhouette. It’s perfect for transitional weather or for showing off high-waisted jeans while staying cozy.\r\n\r\n✅ Key Features\r\n🔥Fashion Forward: The cropped cut creates a leg-lengthening effect and looks great with modern outfits.\r\n🔥Stand-Up Collar: Keep your neck warm without the bulk of a hood, thanks to the puffy high collar.\r\n🔥Vibrant Hue: The electric blue color is eye-catching and energetic.\r\n🔥Lightweight Warmth: Provides excellent insulation without feeling heavy or bulky.\r\n🔥Elastic Fit: Elastic cuffs and hem trap body heat and ensure a snug fit.\r\n🔥Easy Zip: Features a durable chunky zipper that adds a rugged detail to the sleek design.\r\n\r\n📜 Specifications\r\n♦️ Material: Nylon Shell / Polyester Fill\r\n♦️ Color: Royal Blue\r\n♦️ Style: Cropped Puffer\r\n♦️ Collar: High Stand-up', 'products/jIANIkMwdTCGzU8btfrSwFHzbJNtCywFm6tv4fmY.png', '2025-12-28 23:41:01', '2025-12-28 23:41:01', '✔️Trendy cropped length\r\n✔️Vibrant royal blue color\r\n✔️High stand-up collar\r\n✔️Lightweight yet warm\r\n✔️Elasticated cuffs\r\n✔️Sporty street style', 'A trendy cropped blue puffer jacket that combines sporty street style with cozy warmth');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('FTNGcqlYLP7Jd3AAg5WKuVmuc2NURrQ0VJuLSu8P', 9, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiNlhyUHd2OVlXYmZBU2VSODVDTUEyNkYwVXZpZ20wUW1DcXJBZmlWRSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9hZG1pbi9vcmRlcnMvNDYvaW52b2ljZSI7czo1OiJyb3V0ZSI7czoyMDoiYWRtaW4ub3JkZXJzLmludm9pY2UiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo5O30=', 1768631561),
('ZbV1VyfOua52PCaRAnMz8xbgNwEn22bGEJltA3mR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:147.0) Gecko/20100101 Firefox/147.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidjhxYTFuTWhDVW5qZzR5aVY5bjNZaENNQm1qWnRuNDd1OHlPMVBQViI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1768536482);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'customer',
  `otp` varchar(255) DEFAULT NULL,
  `phone_verified_at` timestamp NULL DEFAULT NULL,
  `otp_expires_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `address`, `phone`, `role`, `otp`, `phone_verified_at`, `otp_expires_at`) VALUES
(9, 'Md. Billal Hosen', 'cse138829brur@gmail.com', '2025-12-14 04:02:22', '$2y$12$v6zgHITKU9N5zfAcdx5BeeVYKfZ1LgBqCSErDnidFMJNI7SBTnTba', 'fYz5cQi8BwBAQFtohHnYuLYlnaASNlNQDdmSIJgdoPcBq6iI8tJPqOZet2ID', '2025-12-14 04:01:34', '2025-12-14 04:02:22', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', '01709789875', 'admin', NULL, NULL, NULL),
(11, 'Md. Asirul Islam', 'muhammadasirulislam@gmail.com', '2025-12-14 06:49:22', '$2y$12$DIad8ZjciZwGwF/l3GwTUu3cOYwPvTwV9vag5XlREL0I/IFRFXYG6', NULL, '2025-12-14 06:48:38', '2025-12-14 06:49:22', 'Chockbajar, Rangpur, Parkmor, Rangpur Sadar', '01867510845', 'customer', NULL, NULL, NULL),
(12, 'Suchi Akter', 'cse12005025brur@gmail.com', '2025-12-14 07:18:43', '$2y$12$HXN0skywN08/iv/LGecRQOvg5uSTMGYQujkpgwPv.4x.JW2rOO.EO', 'DY9hCjGbORAi4EfUxuyHsKSpJn4fFueQi5VLadsJz3RgMBUr3AuSZnazVWHa', '2025-12-14 07:18:03', '2025-12-14 07:18:43', 'Kerani Para, CheckPost, Rangpur Sadar, Rangpur', '01709789874', 'customer', NULL, NULL, NULL),
(13, 'Badhon Rani', 'badhonraniroy@gmail.com', '2025-12-14 23:25:47', '$2y$12$BxAkN86XPnT1i2v2MOvlG.yVXAWk6QXTxn07bSmx4QsNFLTmtyJYu', NULL, '2025-12-14 23:25:07', '2025-12-14 23:25:47', 'Sordar Para, Park Mor, Rangpur', '01706788373', 'customer', NULL, NULL, NULL),
(14, 'Rasel', 'shakhrashel095@gmail.com', '2025-12-22 02:38:30', '$2y$12$V1dBECZMRvtA9unCMD1SvuOfDUshI0LDUf0JJw/AEQ1XieHutvd/2', NULL, '2025-12-22 02:36:55', '2025-12-22 02:38:30', 'Sordar Para, Park Mor, Rangpur', '01721100528', 'customer', NULL, NULL, NULL),
(15, 'Mizanur Rahman', 'cse12005010brur@gmail.com', '2025-12-23 03:26:22', '$2y$12$xn4WxNJYNyvTKHLz48SgBeHc.wkcmsF/Fo4bLJumU6kGYAZIboP4S', NULL, '2025-12-23 03:25:50', '2025-12-23 03:26:22', 'Sordar Para, Park Mor, Rangpur', '01709789878', 'customer', NULL, NULL, NULL),
(16, 'Billal Hosen', 'engliweb@gmail.com', '2025-12-28 03:32:08', '$2y$12$g.vqNG/bmuKNXi2ilo.JCujIGNBWiWwN4cBQes.oVQjUJ1kkTW..u', NULL, '2025-12-28 03:31:07', '2025-12-28 03:32:08', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', '01705822867', 'customer', NULL, NULL, NULL),
(19, 'Fashion', 'cse12005005brur@gmail.com', NULL, '$2y$12$LIkHwchOvwt.jTdRKz9D7.TJWcDAG2aM5jwppjuubD/.c3QK20evC', NULL, '2026-01-06 09:04:19', '2026-01-06 09:04:19', 'Koborshan Goli, Chokbazar, Park Mor, Rangpur Sadar, Rangpur', '01867510842', 'customer', '542920', NULL, '2026-01-06 09:14:19'),
(20, 'Shorif', 'cse12005026brur@gmail.com', NULL, '$2y$12$r.S/AybBOF8w5sPEghd3Be5BdVb5JoZCzeYF/HJO/dsEh0vE0OmMu', NULL, '2026-01-07 00:20:08', '2026-01-07 00:20:08', 'park mor ,Rangpur', '01581219523', 'customer', '136638', NULL, '2026-01-07 00:30:08'),
(21, 'Rasel', 'cse139426brur@gmail.com', '2026-01-10 23:02:33', '$2y$12$QYaEffQqD7ZS1iqgWVQGMuNGf2X8jVXSpKjSRVnxoxy67h/IOEWeC', NULL, '2026-01-10 23:01:59', '2026-01-10 23:02:33', 'Sordar Para, Park Mor, Rangpur', '01709786983', 'customer', NULL, NULL, NULL),
(22, 'Kausar', 'cse12005044brur@gmail.com', '2026-01-12 02:37:52', '$2y$12$Q7RJjO79lExlDf.R7PZ70erFk9Li5U9lg.nI6ngzrwxMjPsWjVzzy', NULL, '2026-01-12 01:53:23', '2026-01-12 02:37:52', 'Sordar Para, Park Mor, Rangpur', '01518310547', 'customer', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`),
  ADD KEY `carts_product_id_foreign` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `hero_images`
--
ALTER TABLE `hero_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD UNIQUE KEY `products_sku_unique` (`sku`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_phone_unique` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hero_images`
--
ALTER TABLE `hero_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
