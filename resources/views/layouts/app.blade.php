<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel with Tailwind CSS and Vite</title>
    @vite('resources/css/app.css')
</head>
<body>
    @yield('content')

    @vite('resources/js/app.jsx')
</body>
</html>
