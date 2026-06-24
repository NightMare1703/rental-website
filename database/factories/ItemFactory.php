<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $items = [
            [
                'name' => 'Toyota Avanza',
                'price_per_day' => 350000,
                'stock' => 8,
                'category_id' => 8, // MPV
                'description' => 'Mobil keluarga yang nyaman, irit bahan bakar, cocok untuk perjalanan dalam kota maupun luar kota dengan kapasitas hingga 7 penumpang.',
            ],
            [
                'name' => 'Toyota Innova Reborn',
                'price_per_day' => 550000,
                'stock' => 5,
                'category_id' => 7, // Premium MPV
                'description' => 'Kendaraan premium dengan kabin luas, suspensi nyaman, sangat cocok untuk perjalanan bisnis atau keluarga jarak jauh.',
            ],
            [
                'name' => 'Honda Brio',
                'price_per_day' => 300000,
                'stock' => 6,
                'category_id' => 6, // City Car
                'description' => 'Mobil compact dengan desain modern, hemat BBM, ideal digunakan untuk aktivitas harian di perkotaan.',
            ],
            [
                'name' => 'Daihatsu Xenia',
                'price_per_day' => 325000,
                'stock' => 7,
                'category_id' => 8, // MPV
                'description' => 'Kendaraan serbaguna dengan performa stabil, cocok untuk kebutuhan keluarga kecil maupun perjalanan wisata.',
            ],
            [
                'name' => 'Mitsubishi Pajero Sport',
                'price_per_day' => 900000,
                'stock' => 3,
                'category_id' => 5, // SUV
                'description' => 'SUV premium dengan tenaga besar, tampilan gagah, cocok untuk perjalanan luar kota dan medan yang lebih menantang.',
            ],
            [
                'name' => 'Toyota Fortuner',
                'price_per_day' => 950000,
                'stock' => 2,
                'category_id' => 4, // SUV Premium
                'description' => 'Mobil SUV mewah dengan fitur keselamatan lengkap, sangat cocok untuk perjalanan eksekutif atau kebutuhan premium.',
            ],
            [
                'name' => 'Suzuki Ertiga',
                'price_per_day' => 375000,
                'stock' => 4,
                'category_id' => 8, // MPV
                'description' => 'Kendaraan keluarga dengan kabin nyaman dan efisiensi bahan bakar yang baik untuk perjalanan sehari-hari.',
            ],
            [
                'name' => 'Honda HR-V',
                'price_per_day' => 650000,
                'stock' => 4,
                'category_id' => 3, // Crossover SUV
                'description' => 'SUV modern dengan desain stylish, cocok untuk pengguna yang mengutamakan kenyamanan dan tampilan premium.',
            ],
            [
                'name' => 'Toyota Alphard',
                'price_per_day' => 1800000,
                'stock' => 2,
                'category_id' => 2, // Luxury
                'description' => 'Kendaraan mewah kelas premium dengan interior eksklusif, cocok untuk kebutuhan VIP, wedding, atau perjalanan bisnis.',
            ],
            [
                'name' => 'Daihatsu Ayla',
                'price_per_day' => 250000,
                'stock' => 9,
                'category_id' => 1, // Economy
                'description' => 'Mobil ekonomis dengan biaya operasional rendah, ideal untuk kebutuhan transportasi harian dengan budget hemat.',
            ],
        ];

        return $this->faker->randomElement($items);
    }
}