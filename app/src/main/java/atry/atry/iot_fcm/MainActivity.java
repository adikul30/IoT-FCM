package atry.atry.iot_fcm;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class MainActivity extends AppCompatActivity {

    private DatabaseReference ref;
    private FirebaseDatabase database;
    private ImageView light_bulb;
    private String status = "0";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        light_bulb = (ImageView)findViewById(R.id.light_bulb);

        database = FirebaseDatabase.getInstance();
        ref = database.getReference("Hall");

        light_bulb.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(status.equals("1")){
                    ref.setValue("0");
                }
                else {
                    ref.setValue("1");
                }
            }
        });

        ref.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if(dataSnapshot.getValue(String.class).equals("1")){
                    light_bulb.setImageResource(R.drawable.light_on);
                    status = "1";
                }
                else {
                    light_bulb.setImageResource(R.drawable.light_off);
                    status = "0";
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                Toast.makeText(MainActivity.this,"failed to send message",Toast.LENGTH_SHORT).show();
            }
        });

    }
}
