<?php
//----- makes some settings
//ini_set("memory_limit","128M");
//ini_set("upload_max_filesize","24M");
ini_set("display_errors","on");

//require_once ("libraries/smart-widgets.php");
//require_once ("libraries/smart-widgets.layouts.php");
//require_once ("libraries/smart_utils.php");
//require_once ("libraries/web_address_builder.php");
//require_once ("libraries/security_builder.php");

//require_once ("libraries/sitemap_builder.php");

//load libraries for dealing with database
require_once ("libraries/result_for_query.php");
require_once ("libraries/sqlbuilder.php");
require_once ("libraries/security_builder.php");
require_once ("libraries/input_builder.php");
require_once ("libraries/smart_utils.php");
require_once ("libraries/file_upload_modules.php");
require_once ("libraries/ReaderForDataStoredInArray.BaseClass.php");
require_once ("libraries/rich_text.tokenizer.php");

require_once ("libraries/uploaded_picture_delegate.php");
require_once ("libraries/search_data_builder.php");

//load modules that make up the database
require_once ("db/computed_value_factory.php");

require_once ("db/field_factory.php");

require_once ("db/query.decorators.php");

require_once ("db/queries.php");
require_once ("db/queries.ranking.php");
require_once ("db/query_factory.php");
require_once ("db/queries.extended_post_content.php");
require_once ("db/queries.app.php");
require_once ("db/queries.dashboard.php");

require_once ("db/queries.olap.factory.php");


require_once ("db/triggers.php");
require_once ("db/trigger_factory.php");

require_once ("db/max_length_factory.php");

require_once ("db/search_task.php");

require_once ("db/db.php");

//load other modules
require_once("app/arguments.php");
require_once("app/argument_factory.php");
require_once("app/arguments.app.php");

require_once("app/result_arrays.php");
require_once("app/result_array_factory.php");
require_once("app/result_array.app.php");

require_once("app/cmds.php");
require_once("app/cmd_factory.php");

require_once("app/browser_fields.php");
require_once("app/browser_field.for_page.php");
require_once("app/browser_field.for_cmd.php");
require_once("app/browser_field_factory.php");

require_once ("app/value_factory.php");
require_once ("app/settings.php");
require_once ("app/id_factories.php");

require_once ("app/data_page.functions.php");
require_once ("app/data_page.queries.php");

require_once ("app/app.php");

function get_api_output()
{
    app::debug()->start_request_log();
//==================
    $final_output = array(
        app::values()->error() => "",
        app::values()->content() => array()
    );

    try {
        $cmd = app::browser_fields()->cmd()->toCmd();
        $result_array = $cmd->result_array();

        $result = $result_array->get();
        if (is_array($result)) {
            $final_output["content"] = $result;
            app::debug()->add_to_request_log("content", $result);
        } else {
            throw new Exception("unsupported result type - expected array");
        }

    } catch (InvalidInputException $ex) {
        //todo: this line ensures we dont remain with files if a routine fails to succeed
        UploadedApplicationImage::delete_all_images();

        $final_output['error'] = $ex->getMessage();
        app::debug()->add_to_request_log("error", $ex->getMessage());
    } catch (Exception $ex) {
        //print $ex->getMessage();
        //print $ex->getTraceAsString();
        //exit;

        //todo: this line ensures we dont remain with files if a routine fails to succeed
        UploadedApplicationImage::delete_all_images();
        $final_output['error'] = $ex->getMessage();
        app::debug()->add_to_request_log("error", $ex->getMessage());
    }
    app::debug()->write_request_log();
//header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Methods: *");
//header("Access-Control-Max-age: 1728000");
//header("Access-Control-Allow-Headers: *");
//print json_encode($final_output);
print(json_encode($final_output));
    return $final_output;
}