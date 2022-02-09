SELECT JSON_ARRAYAGG(employees) employees
FROM (
	SELECT JSON_OBJECT(
		'EmployeeId',e.EmployeeId
		,'FirstName',e.FirstName
		,'LastName',e.LastName
		,'DOB',e.DOB
		,'Status',e.Status
		,'Dependents',(SELECT CAST(CONCAT('[',
			GROUP_CONCAT(
				JSON_OBJECT(
					'DependentId',DependentId,
					'EmployeeId',EmployeeId,
					'FirstName',FirstName,
					'LastName',LastName
					)
			),']')
			AS JSON) FROM Dependents where EmployeeId = e.EmployeeId)
	) employees
	FROM Employees e
) a;