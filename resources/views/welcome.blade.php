<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>React with Laravel Mix</title>
  <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body>
  <!-- React app will mount here -->
  <div id="app"></div>

  <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>