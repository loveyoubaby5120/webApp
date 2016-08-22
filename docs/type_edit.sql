CREATE PROCEDURE `type_edit`(
		IN i_pid int ,
		IN i_id int ,
		IN i_name varchar(32),
		OUT error int(10)
) 
	COMMENT '修改类型' 
begin
	DECLARE  new_pid  int  DEFAULT 0;
	DECLARE  new_right int  DEFAULT 0;

	DECLARE  old_pid  int  DEFAULT 0;
	DECLARE  old_right int  DEFAULT 0;

	-- 定义错误标志
	DECLARE t_error INTEGER DEFAULT 0;
	-- 监控错误
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;
	
	-- 开启事务
	START TRANSACTION;


	SELECT `id`  into new_pid FROM `type` WHERE `id` = i_pid;	


	IF new_pid != 0 THEN
		
        SELECT `pid` into old_pid FROM `type` WHERE `id` = i_id;
        SELECT `right` into old_right  FROM `type` WHERE `id` = old_pid;

		UPDATE `type` SET `left` = `left` - 2 WHERE `left` > old_right;
		UPDATE `type` SET `right` = `right` - 2 WHERE `right` >= old_right;

		SELECT `right` into new_right  FROM `type` WHERE `id` = new_pid;	

		UPDATE `type` SET `left` = `left` + 2 WHERE `left` > new_right;
		UPDATE `type` SET `right` = `right` + 2 WHERE `right` >= new_right;

		UPDATE `type` SET `name` = i_name ,`pid` = i_pid ,`left` = new_right , `right`  = new_right + 1  WHERE `id` = i_id;

	END IF ;

	-- 处理事务
	IF t_error = 1 THEN
		
		ROLLBACK;

	ELSE

		COMMIT;

	END IF;

	set error = t_error;
	
end 