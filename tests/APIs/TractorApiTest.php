<?php namespace Tests\APIs;

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Tests\TestCase;
use Tests\ApiTestTrait;
use App\Models\Tractor;

class TractorApiTest extends TestCase
{
    use ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function test_create_tractor()
    {
        $tractor = factory(Tractor::class)->make()->toArray();

        $this->response = $this->json(
            'POST',
            '/api/tractors', $tractor
        );

        $this->assertApiResponse($tractor);
    }

    /**
     * @test
     */
    public function test_read_tractor()
    {
        $tractor = factory(Tractor::class)->create();

        $this->response = $this->json(
            'GET',
            '/api/tractors/'.$tractor->id
        );

        $this->assertApiResponse($tractor->toArray());
    }

    /**
     * @test
     */
    public function test_update_tractor()
    {
        $tractor = factory(Tractor::class)->create();
        $editedTractor = factory(Tractor::class)->make()->toArray();

        $this->response = $this->json(
            'PUT',
            '/api/tractors/'.$tractor->id,
            $editedTractor
        );

        $this->assertApiResponse($editedTractor);
    }

    /**
     * @test
     */
    public function test_delete_tractor()
    {
        $tractor = factory(Tractor::class)->create();

        $this->response = $this->json(
            'DELETE',
             '/api/tractors/'.$tractor->id
         );

        $this->assertApiSuccess();
        $this->response = $this->json(
            'GET',
            '/api/tractors/'.$tractor->id
        );

        $this->response->assertStatus(404);
    }
}
