<?php

namespace Database\Seeders;

use App\Models\Word;
use Illuminate\Database\Seeder;

class SampleWordSeeder extends Seeder
{
    public function run(): void
    {
        // Sample words for Animals category (category_id = 1)
        $animalWords = [
            ['word_oromo' => 'Saree', 'word_english' => 'Dog', 'definition' => 'A domesticated carnivorous mammal'],
            ['word_oromo' => 'Adurree', 'word_english' => 'Cat', 'definition' => 'A small domesticated carnivorous mammal'],
            ['word_oromo' => 'Farda', 'word_english' => 'Horse', 'definition' => 'A large domesticated mammal used for riding'],
            ['word_oromo' => 'Loon', 'word_english' => 'Cow', 'definition' => 'A large domesticated ungulate'],
            ['word_oromo' => 'Hoolaa', 'word_english' => 'Sheep', 'definition' => 'A domesticated ruminant mammal'],
        ];

        foreach ($animalWords as $word) {
            Word::create([
                'word_oromo' => $word['word_oromo'],
                'word_english' => $word['word_english'],
                'definition' => $word['definition'],
                'category_id' => 1,
                // Add image_path and audio_path when you have the files
                // 'image_path' => '/storage/images/' . strtolower($word['word_english']) . '.jpg',
                // 'audio_path' => '/storage/audio/' . strtolower($word['word_english']) . '.mp3',
            ]);
        }

        // Sample words for Food and Drinks category (category_id = 2)
        $foodWords = [
            ['word_oromo' => 'Buddeena', 'word_english' => 'Bread', 'definition' => 'A staple food made from flour'],
            ['word_oromo' => 'Bishaan', 'word_english' => 'Water', 'definition' => 'A clear liquid essential for life'],
            ['word_oromo' => 'Aannan', 'word_english' => 'Milk', 'definition' => 'A white liquid produced by mammals'],
            ['word_oromo' => 'Foon', 'word_english' => 'Meat', 'definition' => 'Animal flesh used as food'],
            ['word_oromo' => 'Injera', 'word_english' => 'Injera', 'definition' => 'Traditional Ethiopian flatbread'],
        ];

        foreach ($foodWords as $word) {
            Word::create([
                'word_oromo' => $word['word_oromo'],
                'word_english' => $word['word_english'],
                'definition' => $word['definition'],
                'category_id' => 2,
            ]);
        }

        // Sample words for Family and People category (category_id = 4)
        $familyWords = [
            ['word_oromo' => 'Abbaa', 'word_english' => 'Father', 'definition' => 'Male parent'],
            ['word_oromo' => 'Haadha', 'word_english' => 'Mother', 'definition' => 'Female parent'],
            ['word_oromo' => 'Ilma', 'word_english' => 'Son', 'definition' => 'Male child'],
            ['word_oromo' => 'Intala', 'word_english' => 'Daughter', 'definition' => 'Female child'],
            ['word_oromo' => 'Obboleessa', 'word_english' => 'Brother', 'definition' => 'Male sibling'],
        ];

        foreach ($familyWords as $word) {
            Word::create([
                'word_oromo' => $word['word_oromo'],
                'word_english' => $word['word_english'],
                'definition' => $word['definition'],
                'category_id' => 4,
            ]);
        }
    }
}
