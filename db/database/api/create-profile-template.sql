-- Template for inserting new profile given by `@{user-name}`.

-- Enter the database
USE @{database};

-- Create the profile
INSERT INTO Profile(UserEmail, UserName, UserType, UserImage,
    StyleSheet, PreferredLanguage, pfLevel, score)
  VALUES(@{user-email}, @{user-name}, @{user-type}, @{user-image},
    @{style-sheet}, @{preferred-language}, 1, 0);
