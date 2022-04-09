-- Template for inserting new game account related to `@{user-name}`.

-- Enter the database
USE @{database};

-- Find the profile to which to relate
INSERT INTO GameAccount(pfid, password)
  (
    SELECT pfid,
        -- Encode password using SHA2 for 64-bit words
        SHA2(@{password}, 512)
      FROM Profile WHERE UserName=@{user-name}
  );
