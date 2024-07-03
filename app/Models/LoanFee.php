<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LoanFee extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'category', 'fee_type', 'desc', 'fee_amount'];


    public function loanCategoryFees(): HasMany
    {
        return $this->hasMany(LoanCategoryFee::class);
    }
}
