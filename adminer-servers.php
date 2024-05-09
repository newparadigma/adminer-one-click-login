<?php
return [
    'mysql' => [
        // Required parameters
        'username'  => 'homestead',
        'pass'      => 'homestead',
        // Optional parameters
        'driver'    => 'server',
        'databases' => [
            'homestead' => 'homestead',
        ]
    ],
    'mongo' => [
        // Required parameters
        'username'  => 'homestead',
        'pass'      => 'homestead',
        // Optional parameters
        'driver'    => 'mongo',
        'databases' => [
            'homestead' => 'homestead',
        ]
    ],
    'postgre' => [
        // Required parameters
        'username'  => 'homestead',
        'pass'      => 'homestead',
        // Optional parameters
        'driver'    => 'pgsql',
        'databases' => [
            'homestead' => 'homestead',
        ]
    ],
];