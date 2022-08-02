@component('mail::message')

Hello {{ $nome }}, <br><br>
Here is your data: <br><br>
-Nome: {{ $nome }} <br><br>
-Cognome: {{ $cognome }} <br><br>
-Email: {{ $email }} <br><br>
-Password: {{ $password }} <br><br>

<center> Please change your password after login: </center>

@component('mail::button', ['url' => 'http://127.0.0.1:3000/'])
    Click Here to login
@endcomponent

@endcomponent
