<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SavedJob extends Model
{
    protected $fillable = ['seeker_id', 'job_listing_id'];

    public function seeker()
    {
        return $this->belongsTo(Seeker::class);
    }

    public function jobListing()
    {
        return $this->belongsTo(JobListing::class);
    }
}
