-- Template for updating new personal access token for canvas account related to `@{user-name}`.

-- Enter the database
USE @{database};

REPLACE INTO CanvasAccount(pfid, pat, patSalt)
  (
    -- Find the profile matching username @{user-name} to relate
    --    to through pfid
    -- pat given by: @{pat}
    -- patSalt given by: @{pat-salt}
    SELECT pfid, @{pat}, @{pat-salt}
      FROM Profile WHERE UserName=@{user-name}
  );
