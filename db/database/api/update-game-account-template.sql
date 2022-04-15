-- Template for updating new password for game account related to `@{user-name}`.

-- Enter the database
USE @{database};

REPLACE INTO GameAccount(pfid, password, passwordSalt)
  (
    -- Find the profile matching username @{user-name} to relate
    --    to through pfid
    -- password given by: @{password}
    -- passwordSalt given by: @{password-salt}
    SELECT pfid, @{password}, @{password-salt}
      FROM Profile WHERE UserName=@{user-name}
  );
