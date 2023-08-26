<?php

namespace app\models;

use Illuminate\Database\Eloquent\Model;

class Idea extends Model
{
    protected $table = 'ideas';
    protected $fillable = ['title', 'description', 'ideaDate', 'completed'];
}
