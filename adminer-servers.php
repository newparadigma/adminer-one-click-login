<?php
return [
    'db-mysql' => [
        // Required parameters
        'username'  => 'local',
        'pass'      => 'local',
        // Optional parameters
        'driver'    => 'server',
        'databases' => [
            'local' => 'local',
        ]
    ],
    'db-mongo' => [
        // Required parameters
        'username'  => 'local',
        'pass'      => 'local',
        // Optional parameters
        'driver'    => 'mongo',
        'databases' => [
            'local' => 'local',
        ]
    ],
    'db-postgre' => [
        // Required parameters
        'username'  => 'local',
        'pass'      => 'local',
        // Optional parameters
        'driver'    => 'pgsql',
        'databases' => [
            'local' => 'local',
        ]
    ],
];