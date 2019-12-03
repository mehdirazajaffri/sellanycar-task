<?php

namespace App\Http\Controllers;

use App\Utils\ResponseUtil;
use Response;

/**
 * @OA\Info(
 *      version="1.0.0",
 *      title="Agriculture API",
 *      description="Sell Any Car Task",
 *      @OA\Contact(
 *          email="mehdirazajaffri@gmail.com"
 *      ),
 *     @OA\License(
 *         name="Apache 2.0",
 *         url="http://www.apache.org/licenses/LICENSE-2.0.html"
 *     )
 * )
 */
class AppBaseController extends Controller
{
    public function sendResponse($result, $message)
    {
        return Response::json(ResponseUtil::makeResponse($message, $result));
    }

    public function sendError($error, $code = 404)
    {
        return Response::json(ResponseUtil::makeError($error), $code);
    }

    public function sendSuccess($message)
    {
        return Response::json([
            'success' => true,
            'message' => $message
        ], 200);
    }
}
