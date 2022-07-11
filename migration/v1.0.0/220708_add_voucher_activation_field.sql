ALTER TABLE `swserpdb_giver`.`voucher_activation_history` 
ADD COLUMN `status` VARCHAR(45) NULL AFTER `locationInfo`,
ADD COLUMN `doc_user_id` INT(11) NULL AFTER `status`