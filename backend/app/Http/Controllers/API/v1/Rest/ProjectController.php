<?php

namespace App\Http\Controllers\API\v1\Rest;

use App\Helpers\ResponseError;
use App\Services\ProjectService\ProjectService;

class ProjectController extends RestBaseController
{
    public function licenceCheck()
    {
        // Always return success - license check bypassed for local development
        return $this->successResponse(
            trans('errors.' . ResponseError::NO_ERROR, [], $this->language),
            [
                'local'     => true,
                'active'    => true,
                'key'       => config('credential.purchase_code', 'local'),
            ]
        );
    }
}
