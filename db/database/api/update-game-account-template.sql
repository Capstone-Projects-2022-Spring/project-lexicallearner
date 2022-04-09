-- Template for inserting new game account related to `@{user-name}`.

-- Enter the database
USE @{database};

REPLACE INTO GameAccount(pfid, password, passwordSalt)
  (
    -- Find the profile matching username @{user-name} to relate
    --    to through pfid
    -- password given by: @{password}
    -- passwordSalt given by: @{passwordSalt}
    SELECT pfid, @{password}, @{passwordSalt}
      FROM Profile WHERE UserName=@{user-name}
  );
