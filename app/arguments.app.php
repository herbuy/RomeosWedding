<?php

class InputForDepartmentCode extends TextDefinition{
    public function getName()
    {
        return app::values()->department_code();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->text_code();
    }
}

class InputForProductTypeCode extends TextDefinition{
    public function getName()
    {
        return app::values()->product_type_code();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->text_code();
    }
}
class InputForProductTypeCodeOptional extends InputForProductTypeCode{
    protected function canBeNull()
    {
        return true;
    }
}
class InputForFacilityTypeCode extends TextDefinition{
    public function getName()
    {
        return app::values()->facility_type_code();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->text_code();
    }
}

class InputForWorkTypeCode extends TextDefinition{
    public function getName()
    {
        return app::values()->work_type_code();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->text_code();
    }
}

class InputForArticleTypeCode extends TextDefinition{
    public function getName()
    {
        return app::values()->article_type_code();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->text_code();
    }
}

class InputForEventTypeCode extends TextDefinition{
    public function getName()
    {
        return app::values()->event_type_code();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->text_code();
    }
}

class InputForProfileTypeCode extends TextDefinition{
    public function getName()
    {
        return app::values()->profile_type_code();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->text_code();
    }
}


class InputForStatusTypeCode extends TextDefinition{
    public function getName()
    {
        return app::values()->status_type_code();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->text_code();
    }
}

class InputForItemRating extends EnumVariable{
    public function getName()
    {
        return app::values()->rating();
    }
    protected function getArrayOfAcceptableValues()
    {
        return array(
            app::possible_ratings()->poor(),
            app::possible_ratings()->below_average(),
            app::possible_ratings()->average(),
            app::possible_ratings()->above_average(),
            app::possible_ratings()->excellent()
        );
    }
    protected function defaultValue()
    {
        return app::possible_ratings()->above_average();
    }
}

class InputForMobileNumber extends BigIntValueDefinition{
    public function getName()
    {
        return app::values()->mobile_number();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->mobile_number();
    }
}

class OptionalInputForStartIndex extends BigIntValueDefinition{
    public function getName()
    {
        return app::values()->start_index();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->start_index();
    }
    protected function canBeNull()
    {
        return true;
    }
    protected function defaultValue()
    {
        return 0;
    }
}
class OptionalInputForMaxNumber extends BigIntValueDefinition{
    public function getName()
    {
        return app::values()->max_number();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->max_number();
    }
    protected function canBeNull()
    {
        return true;
    }
    protected function defaultValue()
    {
        return 50;
    }
}

class OptionalInputForSearchQuery extends TextDefinition{
    public function getName()
    {
        return app::values()->search_query();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->search_query();
    }
    protected function minLengthInChars()
    {
        return 4;
    }
    protected function canBeNull()
    {
        return true;
    }
    protected function defaultValue()
    {
        return "";
    }
    

    protected function exceededLengthMessage()
    {
        return "search query too long";
    }

    protected function tooShortMessage()
    {
        return "search query too short";
    }
}

class InputForUrl extends TextDefinition{
    public function getName()
    {
        return app::values()->url();
    }
    protected function maxLengthInChars()
    {
        return Db::max_length()->url();
    }
}

class InputForSellingPrice extends FloatInputDefinition{
    public function getName()
    {
        return app::values()->selling_price();
    }
    protected function maxLengthInChars()
    {
        return 8;
    }
}
class InputForRentalPrice extends FloatInputDefinition{
    public function getName()
    {
        return app::values()->rental_price();
    }
    protected function maxLengthInChars()
    {
        return 8;
    }
}
class InputForCurrencyCode extends EnumVariable{
    public function getName()
    {
        return app::values()->currency_code();
    }
    protected function defaultValue()
    {
        return app::currency_codes()->ugx();
    }

    protected function getArrayOfAcceptableValues()
    {
        return array(
            app::currency_codes()->ugx(),
            app::currency_codes()->usd()
        );
    }
}