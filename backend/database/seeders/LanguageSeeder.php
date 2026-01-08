<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $languages = [
            [
                'id' => 1,
                'locale' => 'en',
                'title' => 'English',
                'default' => 1,
                'active' => 1,
                'backward' => 0,
            ],
            [
                'id' => 2,
                'locale' => 'fr',
                'title' => 'French',
                'default' => 0,
                'active' => 1,
                'backward' => 0,
            ]
        ];

        foreach ($languages as $language) {
            Language::updateOrInsert(['id' => $language['id']], $language);
        }
    }
}
