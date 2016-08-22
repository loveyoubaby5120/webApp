CREATE PROCEDURE `type_add`(
		IN i_pid int ,
		IN i_name varchar(32),
		OUT error int(10)
) 
	COMMENT '添加类型' 
begin
	DECLARE  _pid  int  DEFAULT 0;
	DECLARE  _right int  DEFAULT 0;

	-- 定义错误标志
	DECLARE t_error INTEGER DEFAULT 0;
	-- 监控错误
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET t_error=1;
	
	-- 开启事务
	START TRANSACTION;

	
	SELECT `id`,`right` into _pid,_right  FROM `type` WHERE `id` = i_pid;
	

	IF _pid != 0 THEN
		
		UPDATE `type` SET `left` = `left` + 2 WHERE `left` > _right;
		UPDATE `type` SET `right` = `right` + 2 WHERE `right` >= _right;
		INSERT INTO `type`(`name` ,`pid` ,`left` ,`right` ) VALUES(i_name, i_pid, _right, _right+1); 

	END IF ;

	-- 处理事务
	IF t_error = 1 THEN
		
		ROLLBACK;

	ELSE

		COMMIT;

	END IF;

	set error = t_error;
	
end 