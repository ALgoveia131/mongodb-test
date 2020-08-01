//I've forked this file from https://github.com/mikhail-cct/CA1-In-class-Demo and I've changed/adapted it for my CCT college CA1 project.
function draw_table()
{
	$("#results").empty();
	$.getJSONuncached = function (url)
	{
		return $.ajax(
		{
			url: url,
			type: 'GET',
			cache: false,
			success: function (html)
			{
				$("#results").append(html);
				select_row();
			}
		});
	};
	$.getJSONuncached("/get/html")
};

function select_row()
{
	// changed menuTable 
	$("#productTable tbody tr[id]").click(function ()
	{
		

		$(".selected").removeClass("selected");
		$(this).addClass("selected");
		var section = $(this).prevAll("tr").children("td[colspan='3']").length - 1;
		var product = $(this).attr("id") - 1;
		delete_row(section, product);
	})
};

function delete_row(sec, prod)
{
	$("#delete").click(function ()
	{
		$.ajax(
		{
			url: "/post/delete",
			type: "POST",
			data:
			{
				section: sec,
				product: prod
			},
			cache: false,
			success: setTimeout(draw_table, 1000)
		})
	})
};

$(document).ready(function ()
{
	draw_table();
});
