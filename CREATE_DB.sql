-- table
CREATE TABLE `nguoi_dung` (
	`nguoi_dung_id` INT PRIMARY KEY AUTO_INCREMENT,
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`ho_ten` VARCHAR(255),
	`anh_dai_dien` TEXT,
	`tuoi` INT,
	`mat_khau` VARCHAR(255),
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `hinh_anh` (
	`hinh_id` INT PRIMARY KEY AUTO_INCREMENT,
	`nguoi_dung_id` INT,
	`ten_hinh` VARCHAR(255),
	`duong_dan` VARCHAR(255),
	`mo_ta`		VARCHAR(255),
	
	FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`nguoi_dung_id`),
	-- mặc định luôn luôn có
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `binh_luan` (
	`binh_luan_id` INT PRIMARY KEY AUTO_INCREMENT,
	`nguoi_dung_id` INT,
    `hinh_id` INT,
	FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`nguoi_dung_id`),
	FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh`(`hinh_id`),
	`ngay_binh_luan` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`noi_dung` TEXT,
	
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL
);


CREATE TABLE `luu_anh`(
	`nguoi_dung_id` INT,
    `hinh_id` INT,

    PRIMARY KEY (`nguoi_dung_id`, `hinh_id`),

    FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung`(`nguoi_dung_id`) ON DELETE CASCADE,

    FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh`(`hinh_id`) ON DELETE CASCADE,
    
    `ngay_luu` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);