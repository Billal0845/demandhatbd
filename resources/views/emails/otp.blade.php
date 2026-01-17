<!DOCTYPE html>
<html>
<head><title>Verification Code</title></head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
    <h2>Hello, {{ $name }}</h2>
    <p>Thank you for registering.</p>
    <p>Your verification code is:</p>
    <h1 style="color: #4F46E5; letter-spacing: 5px;">{{ $otp }}</h1>
    <p>This code expires in 10 minutes.</p>
</body>
</html>